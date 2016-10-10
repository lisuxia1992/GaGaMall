/**
 * 商城主页
 */
'use strict';
import React, {Component} from 'react';
import{ 
    View,
    Text,
    Dimensions,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    InteractionManager,
} from 'react-native';
import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';
import City from './City';
import Search from './Search';
import OrderConfirm from './OrderConfirm';
import ShortLine from '../component/ShortLine';
import * as types from '../common/ActionTypes';
import FetchHttpClient, { form,header } from 'fetch-http-client';
import {SLIDER_IMAGE_PATH,UPLOAD_IMAGE_PATH,ADVERHOST,ADVER_ACTION,CLASSIFY_INFOMATION,CLASSIFY_IMAGE_PATH} from  '../common/Request';
import { toastShort } from '../utils/ToastUtil';

import Loading            from '../component/Loading';

var CustomRequest = require('../actions/AdverAction');
var {height, width} = Dimensions.get('window');
var item_width = (width-1)/2;

var BANNER_IMGS = [  
];

const NEAR_IMAGES = [
    require('../imgs/home/near_mechant.jpg'),
    require('../imgs/home/near_group.jpg'),    
    require('../imgs/home/near_store.jpg'),    
];

const merchant = [
  {
    "title":"商户测试",
    "detail":"这是描述描述",
    "price":35.6,
    "origin_price":46,
    "sole":4,
    "url":"",
    "wechat_price":3
  },
  {
    "title":"商户测试",
    "detail":"这是描述描述",
    "price":3.6,
    "origin_price":6,
    "sole":4,
    "url":"",
    "wechat_price":"微信再减1元"
  }
];

class Home extends Component {
   constructor(props) {
      super(props);
      this.categoryAction=this.categoryAction.bind(this);
      this.topItemAction=this.topItemAction.bind(this);
      this.bannerAction=this.bannerAction.bind(this);
      this.centerAdverAction=this.centerAdverAction.bind(this);
      this.classifyAction=this.classifyAction.bind(this);
      this.merchantAction=this.merchantAction.bind(this);

      this.state = {
         bannerList:[],
         categoryList:[],
         centerAdverList:[],
         centerAdverContent:[],
         classifyList:[],
         merchantList:[]
      };
    }
    
    componentDidMount() {
        CustomRequest.performAdverAction((data) => {
          
          BANNER_IMGS = data;
          
          this.setState({
            bannerList: this.renderAdver(data,this.bannerAction)
          });
        });

        CustomRequest.fetchGroupCategory((data) => {
          this.setState({
            categoryList:this.renderCategory(data,this.categoryAction)
          });
        });

        CustomRequest.fetchCenterAdver((data) => {
          this.setState({
            centerAdverList:this.renderCenterAdver(data,this.centerAdverAction)
          });
          this.setState({
            centerAdverContent:data
          })
        });

        CustomRequest.fetchClassify((data) => {
          this.setState({
            classifyList:this.renderClassify(data,this.classifyAction)
          });
        });

    }
    /*      点击事件    */ 
    topItemAction(position){//导航条上的事件处理
      const {navigator} = this.props;
      if(position === 0){
          InteractionManager.runAfterInteractions(() => {
            navigator.push({
              component: City,
              name: 'City'
              });
            });
      }else if(position === 1){
          InteractionManager.runAfterInteractions(() => {
            navigator.push({
              component: Search,
              name: 'Search'
              });
            });
      }
    }

    bannerAction(data){//头部广告
      const {navigator} = this.props;
    }
  categoryAction(data){//分类信息
      const {navigator} = this.props;
      var position = data['cat_id'];
      if(position === 1){
          InteractionManager.runAfterInteractions(() => {
            navigator.push({
              component: OrderConfirm,
              name: 'OrderConfirm'
              });
            });
      }else if(position === 2){

      }else if(position === 3){
          
      }else if(position === 4){
          
      }
  }  

  centerAdverAction(position){//附近活动
    const {navigator} = this.props;
    var content = this.state.centerAdverContent;
    var link = content['url'];
    if (position === 1) {//优惠推荐

    }else if (position === 2) {//新用户专享

    }else{//hot

    }
  }

  classifyAction(data){//分类信息
    const {navigator} = this.props;
    var position = data['cid'];
    if (position === 1) {

    }else if (position === 2) {

    }else{

    }
  }

  merchantAction(position){//猜你喜欢
    const {navigator} = this.props;
    if(position === 1){
          InteractionManager.runAfterInteractions(() => {
            navigator.push({
              component: OrderConfirm,
              name: 'OrderConfirm'
              });
            });
      }else if(position === 2){

      }else if(position === 3){
          
      }else if(position === 4){
          
      }
  }
  
  /*      渲染UI    */ 

  // 首页广告
  renderAdver(data,onPress){
    var contentList = [];
    data.map(function(list, index){
      var url = UPLOAD_IMAGE_PATH+list['pic'];
      var viewList =  <View key={index} style={{alignItems:'center'}}>
                        <TouchableOpacity onPress={() =>onPress(list)}>
                        <Image source={{uri:url}} style={{width: width, height: 140, alignSelf:'center'}}/>
                        </TouchableOpacity>
                      </View>
        contentList.push(viewList);
    })
    return contentList;
  }

  // 团购分类信息
  renderCategory(data,onPress){
    var catlist = [];
    data.map(function(list, index){
      
      var url = SLIDER_IMAGE_PATH + list['pic'];
      var catview = <View key={index} style={styles.center_item_wrap}>
                      <TouchableOpacity onPress={()=>onPress(list)}>
                       <Image source={{uri: url}} style={{width:30,height:30}}/>
                       <Text style={styles.center_item_tv}>{list['name']}</Text>
                      </TouchableOpacity>
                    </View>
                   
                    
      catlist.push(catview);
    });
    return catlist;

  }

  renderCenterAdver(data,onPress){//优惠活动
    var contentList = [];
    data.map(function(list, index){
      var url = UPLOAD_IMAGE_PATH+list['pic'];
        contentList.push(url);
    })
    return contentList;
  }

  renderNearInfo(){//附近相关
    var title = ['附近商家','附近团购','附近快店'];
    var tips = ['快速找到商家','看得到的便宜','购物无需等待'];
    var color = ['#f75689','#f88a1a','#06c1ae'];
    var viewArr = [];
    for (var i = 0; i < NEAR_IMAGES.length; i++) {
      var content = <TouchableOpacity key={i}  onPress={()=>this.centerAdverAction(i)}>
                      <View style={{flexDirection:'row', marginTop:0,marginLeft:0,width:width/3}}>
                      
                        <View style={{marginTop:5,marginLeft:0,marginRight:10}}>
                        
                          <Text style={{color:color[i],fontSize:14,fontWeight:'bold',marginLeft:10,marginTop:5,marginRight:10}} >{title[i]}</Text>
                          <Text style={{color:'#c1c1c1',fontSize:12,marginTop:5,marginLeft:10,marginRight:10}} >{tips[i]}</Text>
                          <Image source={NEAR_IMAGES[i]} style={{alignSelf:'flex-end',marginRight:10,marginBottom:10,marginTop:10,width:24,height:24}} />
                        </View>
                        
                          {NEAR_IMAGES.length-1===i?null:<Image style = {{width:1}}  source={require('../imgs/home/ic_home_shu.png')}/>} 
                        
                       </View>
                    </TouchableOpacity> 
                    
                  
      viewArr.push(content);
    }
    return viewArr;
    
  }

  renderClassify(data){//分类信息
    var catlist = [];

    data.map(function(list, index){
      
      var url = CLASSIFY_IMAGE_PATH + list['cat_pic'];
      var catview = <TouchableOpacity key={index} onPress={()=>onPress(list)}>
                      <View style={{flexDirection:'row'}}>
                        <View style={{flex:2, marginTop:0, alignItems:'center',width:84,height:56}}>
                         <Image source={{uri: url}} style={{width:26,height:26}}/>
                         <Text style={{color:'#777',fontSize:12,marginTop:5}}>{list['cat_name']}</Text>
                        </View>
                        {data.length-1===index?null:<Image style = {{flex:1,width:1}}  source={require('../imgs/home/ic_home_shu.png')}/>}
                      </View>
                    </TouchableOpacity>
                   
      catlist.push(catview);
    });
    return catlist;

  }

  renderYouLikeMerchant(data){//猜你喜欢
    var catlist = [];

    data.map(function(list, index){
      
      var url = CLASSIFY_IMAGE_PATH + list['cat_pic'];
      var catview = <TouchableOpacity key={index}  onPress={()=>this.merchantAction(index)} >
                      <View  style={{flexDirection:'row', marginTop:0, width:width, height:100}}>
                       <Image source={{uri: url}} style={{width:91,height:84, marginLeft:10, marginTop: 5, marginBottom:5, backgroundColor:'orange'}}/>
                       <View style={{flexDirection:'column', marginLeft:10, marginTop:5, marginBottom:5}} >
                         <Text style={{color:'#333',fontSize:16,marginTop:5, marginLeft: 0}}>{list['title']}</Text>
                         <Text style={{color:'#999',fontSize:14,marginTop:5, marginLeft: 0}}>{list['detail']}</Text>
                         <View style={{flexDirection:'row',justifyContent:'flex-end', marginBottom:5, marginLeft: 0, marginTop: 20}}>
                           <View style={{flex:2, flexDirection:'row'}} >
                             <Text style={{color:'#06c1ae', fontSize: 18}} > {list['price']} </Text>
                             <Text style={{color:'#999', fontSize: 12,marginTop:7}} >元</Text>
                             <Text style={{color:'#999', fontSize: 12,textDecorationLine:'line-through',marginTop:7}}>{list['origin_price']}</Text>
                           </View>
                           <View style={{flex:1, marginRight:10, marginTop:7,marginLeft:120}} >
                             <Text style={{color:'#999', fontSize: 12}}>已售{list['sole']}</Text>
                           </View>
                         </View>
                       </View>
                    </View>
                  </TouchableOpacity> 
                   
      catlist.push(catview);
    });
    return catlist;
  }
  _renderDotIndicator() {
        return <PagerDotIndicator pageCount={this.state.bannerList.length} />;
  }


  render() {
        return (
           <View style={{backgroundColor:'#f5f5f5',flex:1}}>
              
              <View style={{height:44,backgroundColor:'black',flexDirection:'row'}}>
                <View style={{flex:1,justifyContent:'center'}}>
                     <TouchableOpacity onPress={()=>{this.topItemAction(0)}}>
                          <View style={{justifyContent:'flex-start',alignItems:'center',flexDirection:'row'}}>
                                <Image source={require('../imgs/home/ic_home_top_location.png')} 
                                       style={{width:12,height:16,marginLeft:10,marginTop:14}}/>
                                <Text style={{color:'white',fontSize:13,marginLeft:5,marginTop:12}}>定位中</Text>
                          </View>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Image source={require('../imgs/home/ic_home_top_icon.png')} style={{width:25,height:20,marginTop:12}}/>
                </View>  
                <View style={{justifyContent:'flex-end',alignItems:'center',flex:1,flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>{this.topItemAction(1)}}>
                         <Image source={require('../imgs/home/ic_home_top_search.png')} 
                           style={{width:16,height:16,marginRight:10,marginTop:14}}/>
                    </TouchableOpacity>
                </View>
              </View>
            <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
              <IndicatorViewPager
                    style={{height:140}}
                    indicator={this._renderDotIndicator()}
                     >
                    {this.state.bannerList}
                     
             </IndicatorViewPager>

             <View style={{flex:1,marginTop:10}}>
                <View style={{flexDirection:'row',flexWrap:'wrap', backgroundColor:'white',paddingTop:10,paddingBottom:10}}>
                 {this.state.categoryList}
                </View> 
                  
             </View>
             <View style={{marginTop:10,backgroundColor:'white'}}>
                <View style={{flexDirection:'row',height:140,marginTop:10,marginBottom:10}}>
                    <View style={{flexDirection:'row',width:item_width,marginTop:0,marginBottom:0}}>
                          <Image source={{uri:this.state.centerAdverList[0]}} style={{width:item_width,marginTop:0,marginBottom:0}}/>                      
                    </View>
                    <Image source={require('../imgs/home/ic_home_shu.png')} style={{height:160, marginTop:-10,width:0.5}}/>
                    <View style={{flexDirection:'column', width:item_width,marginBottom:0,marginTop:0}}>
                      <TouchableOpacity onPress = {()=>this.centerAdverAction(2)}>
                        <View style={{flexDirection:'row',width:item_width,marginTop:0,height:66}}>
                          <Image source={{uri:this.state.centerAdverList[1]}} style={{marginTop:0,marginBottom:0,width:item_width}}/>                     
                        </View>
                      </TouchableOpacity>
                    
                      <ShortLine/>
                      <TouchableOpacity onPress = {()=>this.centerAdverAction(3)}>
                        <View style={{flexDirection:'row',width:item_width,marginTop:1,height:73}}>
                          <Image source={{uri:this.state.centerAdverList[2]}} style={{marginTop:0,marginBottom:0,width:item_width}}/>                   
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <ShortLine/>
                  <View style={{flexDirection:'row',height:85,marginTop:0,marginBottom:0}}>
                    {this.renderNearInfo()}
                  </View>
                </View>
                
                <View style={{marginTop:10,backgroundColor:'white'}}>
                  <View style={{height:40,justifyContent:'center'}}><Text style={{marginLeft:10,marginTop:0,color:'gray'}}>分类信息</Text></View>
                  <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false} horizontal={true} showsHorizontalScrollIndicator={false} >
                    <View style={{flexDirection:'row',height:56,marginTop:5}} >
                      {this.state.classifyList}
                    </View>
                  </ScrollView>
                </View>

                <View style={{marginTop:10,backgroundColor:'white'}}>
                  <View style={{height:40,justifyContent:'center'}}><Text style={{marginLeft:10,marginTop:0,color:'gray'}}>猜你喜欢</Text></View>
                  <ShortLine/>
                  <View style={{flex:1}} >
                    {this.renderYouLikeMerchant(merchant)}
                  </View>   
                     
                </View>
              </ScrollView>  
           </View>         
        );
    }
}
const styles=StyleSheet.create({
    center_item_wrap:{
        alignSelf:'center',
        alignItems:'center',
        flex:1,
        justifyContent:'flex-end',
        width:width/4,
        marginTop:10
    },
    center_item_tv:{
        fontSize:12,
        marginTop:10,
        marginBottom:5,
        textAlign:'center',
        backgroundColor:'#00000000'
    }
});
export default Home;