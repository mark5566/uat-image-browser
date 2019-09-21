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
} from 'react-native';
import ImageViewer,{ImageViewerPropsDefine} from "react-native-image-zoom-viewer";
import { IImageInfo } from "react-native-image-zoom-viewer/built/image-viewer.type";

type Props = {
		style : ViewStyle,
} & ImageViewerPropsDefine;
type State = {
	show : Boolean,
	imgs : IImageInfo[],
	index : Number,
};

export class ImageBrowser extends Component <Props,State>{
		static defaultProps :Props = {
		}
		state:State={
			show :false,
			imgs :[],
			index: 0,
		}

		showWithImg = (index:Number,imgs:IImageInfo[])=>{
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

		render(){
				const {style} = this.props
				const {
					show,
					imgs,
					index
				} = this.state;
				return (
						<Modal
							visible={show}>
								<ImageViewer 
									{...this.props} 
									imageUrls={imgs} 
									index={index}
									onClick={this.hide}
									/>
						</Modal>
				)
		}
}

const styles = StyleSheet.create({
		container:{},
})