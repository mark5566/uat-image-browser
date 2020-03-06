/**
* 备注：查看大图
* create by Mark at 2019-September
*/
import React, { Component } from 'react';
import { 
		View,
		Text,
		Image,
		TouchableOpacity,
		StyleSheet,
		ViewStyle,
		Modal,
		Alert,
		ActionSheetIOS,
		CameraRoll,		
} from 'react-native';
import ImageViewer,{ImageViewerPropsDefine} from "react-native-image-zoom-viewer";
import { IImageInfo } from "react-native-image-zoom-viewer/built/image-viewer.type";


export type LinkPosition = {
	url : String,
	position : {
		x:Number,y:Number
	},//x、y分别是百分比
}

export type ImgLink = {
	links?: LinkPosition[],
}& IImageInfo

type Props = {
	style : ViewStyle,
	enableExtraLink?: Boolean,//是否允许开启链接提示
	onImgClick?: (link:LinkPosition)=>{},
} & ImageViewerPropsDefine;

type State = {
	show : Boolean,
	imgs : ImgLink[],
	index : Number,
	tip  ?:String , 
};

export class ImageBrowser extends Component <Props,State>{
		static defaultProps :Props = {
			enableExtraLink : false,
			onImgClick:(index)=>{console.log('click img '+index.url)}
		}
		state:State={
			show :false,
			imgs :[],
			index: 0,
			tip : null,
		}

		showWithImg = (index:Number,imgs:ImgLink[])=>{
			this.setState({
				show : true,imgs:imgs,index:index,
			})
		}

		hide = ()=>{
			this.setState({
				show :false,
				imgs: [],
			})
		}

		changeIndex = (index:Number)=>{
			this.setState({
				index : index
			})
		}

		_clickLink = (data:LinkPosition)=>{
			this.props.onImgClick && this.props.onImgClick(data)
		}

		_clickDefaultLink = ()=>{
			let imgs: ImgLink[] = this.state.imgs;
			let item : LinkPosition= imgs[0].links[0];
			this._clickLink(item);
		}

		_renderBtn = ()=>{
			if(this.state.imgs.length == 0){
				return <View />
			}
			let link : ImgLink = this.state.imgs[this.state.index];
			let hasLink : Boolean = link.links.length > 0;
			if(!this.props.enableExtraLink || !hasLink){
				return <View />
			}
			return (
				<TouchableOpacity
					onPress={this._clickDefaultLink}
					style={styles.linkBtn}>
					<Text style={{color:'white'}}>去下单</Text>
				</TouchableOpacity>
			)
		}

		/**
		 * 渲染底部菜单
		 */
		_renderBottom = ({cancel,saveToLocal}:any)=>{
			return ActionSheetIOS.showActionSheetWithOptions({
				title :"选择操作",
				options : [
					"保存图片",
					"取消"
				],
				cancelButtonIndex : 1,
			},(index:Number)=>{
				if(index==0){
					console.log(saveToLocal);
					saveToLocal();
				}else{
					cancel();
				}
			})
			// return (
			// 	<View style={{width : '100%',height:100}}>
			// 		<Text>保存</Text>
			// 		<Text>取消</Text>
			// 	</View>
			// )
		}

		_onSave = (url:String)=>{
			CameraRoll.saveToCameraRoll(url)
								.then(res=>{
									this.setState({tip : '图片保存到相册'},()=>{
										setTimeout(() => {
											this.setState({tip : null})
										}, 2000);
									})
									console.log('图片保存到相册')
								})
								.catch(err=>{
									console.log(err);
								})
		}

		/**
		 * 渲染提示语
		 */
		_renderTip = (tip?:String)=>{
			if(!tip){
				return <View />
			}
			return (
				<View style={{position:'absolute',width:200,height:50,borderRadius:10,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0.5)',alignSelf:'center',bottom:200}}>
					<Text style={{color:'white'}}>
						{tip}
					</Text>
				</View>
			)
		}

		render(){
				const {style} = this.props
				const {
					show,
					imgs,
					index,
					tip,
				} = this.state;
				return (
						<Modal
							visible={show}>
								<View style={styles.content}>
									<ImageViewer 
										{...this.props} 
										imageUrls={imgs} 
										index={index}
										onChange={this.changeIndex}
										onClick={this.hide}
										onSave={this._onSave}
										// onSaveToCamera
										menus={this._renderBottom}
										/>
									{this._renderBtn()}
								</View>
								{this._renderTip(tip)}
						</Modal>
				)
		}
}

const styles = StyleSheet.create({
		container:{},
		content:{
			flex:1,
		},
		linkBtn : {
			position:'absolute',
			// zIndex:1,
			width : 200,
			height:30,
			borderRadius:5,
			borderWidth:1,
			borderColor:'white',
			alignItems:'center',
			justifyContent:'center',
			alignSelf:'center',
			bottom:100,
			backgroundColor:'rgba(0,0,0,0.5)'
			// right:20,
		}
})