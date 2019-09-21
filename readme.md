# 封装react-native-image-zoom-viewer

## 安装
	- npm install --save react-native-image-zoom-viewer
	- npm install --save react-native-image-browser

## 使用
	```
	import {ImageBrowser} from 'react-native-image-browser'
	...
	render(){
		return (
			...
			<ImageBrowser ref={ref=>this.imgBrowser=ref}/>
			...
		)
	}

	需要查看大图是： this.imgBrowser.showWithImg(img:IImageInfo[]);

	隐藏大图：this.imgBrowser.hide();
	```