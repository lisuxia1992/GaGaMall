
/*  登录注册  */
export const HOST='http://222.184.250.36:8082/GaGaMallServer/';  //API地址

export const LOGIN_ACTION = "LoginAction";  //用户登录

export const REGISTER_ACTION = "RegisterAction"; //用户注册

export const SERVER_HOST = 'http://gorsonzhu.gotoip4.com/'; //服务器
// export const IMAGE_HOST = 'http://localhost/'//本地

export const API_HOST = 'http://localhost/tp5/public/';//API访问地址
export const UPLOAD_IMAGE_PATH = SERVER_HOST + 'upload/adver/';  // 上传广告图片路径
export const SLIDER_IMAGE_PATH = SERVER_HOST + 'upload/slider/'; // 上传团购图标路径
export const CLASSIFY_IMAGE_PATH = SERVER_HOST + 'upload/system/';//上传分类信息路径

/*		首页广告		*/ 
export const ADVERHOST= API_HOST + 'getAdver_catid';  
export const ADVER_ACTION = "AdverAction";  


/*		首页团购分类		*/ 
export const CATEGORY_ADRESS = API_HOST + 'get_slider_catid';
export const CATEGORY_ACTION = 'CategoryAction';

/*		首页分类信息		*/ 
export const CLASSIFY_INFOMATION = API_HOST + 'get_classify_subdir';
export const CLASSIFY_ACTION = 'ClassifyAction';