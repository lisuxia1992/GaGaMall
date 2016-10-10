/**
 * 城市选择
 */
'use strict';
import React from 'react';
import {
  Dimensions,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ListView,
  TextInput,
  InteractionManager,
} from 'react-native';

import { NaviGoBack } from '../utils/CommonUtils';
import ShortLine from '../component/ShortLine';
import StoreList from './StoreList';
var {height, width} = Dimensions.get('window');
var content = '';

const SEARCH_DATA={
    "api":"GetSearchHistory",
    "v":"1.0",
    "code":"0",
    "msg":"success",
    "data":[{
        "id":0,
        "name":"干锅",
    },{
        "id":1,
        "name":"轻食",
    },{
        "id":2,
        "name":"日料",
    },{
        "id":3,
        "name":"自助",
    }]
};

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.buttonBackAction=this.buttonBackAction.bind(this);    
    this.topItemAction=this.topItemAction.bind(this);
    this.onPressItem=this.onPressItem.bind(this);
    this.renderItem = this.renderItem.bind(this); 
    this.state={
         dataSource: new ListView.DataSource({
           rowHasChanged: (row1, row2) => row1 !== row2,
         }),
         searchDatas :SEARCH_DATA.data,
      }
  } 
    //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }
  topItemAction(position){
      const {navigator} = this.props;
      if(position === 0){
          InteractionManager.runAfterInteractions(() => {
            navigator.push({
              component: StoreList,
              name: 'StoreList'
            });
          });
      }
  }
  onEndReached(typeId) {
     
  }
  //点击列表每一项响应按钮
  onPressItem(data){
      const {navigator} = this.props;
      InteractionManager.runAfterInteractions(() => {
            navigator.push({
              component: StoreList,
              name: 'StoreList'
            });
          });
  }
  //进行渲染数据
  renderContent(dataSource) {
    return (
      <ListView
        initialListSize={1}
        dataSource={dataSource}
        renderRow={this.renderItem}
        style={{backgroundColor:'white',flex:1}}
        onEndReachedThreshold={10}
        enableEmptySections={true}
      />
    );
   }
  //渲染每一项的数据
  renderItem(data) {
    return (
      <View>
      <TouchableOpacity onPress={()=>{this.onPressItem(data)}}>
          <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',height:40,flex:1}}>
                <Image source={require('../imgs/ic_search_icon.png')} style={{marginLeft:8,width:18,height:18}}/>
                <Text style={{marginLeft:8}}>{data.name}</Text>
          </View>
      </TouchableOpacity>
      <Image source={require('../imgs/ic_short_bar.png')} style={{marginLeft:8}}/>     
      </View>
    );
  }
  render() {
    return (
       <View style={{backgroundColor:'#fff',flex:1}}>
          <View style={{height:44,backgroundColor:'black',flexDirection:'row'}}>
                <View style={{width:44,height:44,justifyContent:'center'}}>
                     <TouchableOpacity onPress={() => {this.buttonBackAction()}} style={{justifyContent:'center',alignItems:'center'}} >
                           <Image 
                                 style={{width:10,height:16,marginTop:12,marginLeft:5}}
                                 source={require('../imgs/ic_center_back.png')}
                           />
                     </TouchableOpacity>  
                </View>
                <View style={{flex:1,justifyContent:'center',}}>
                    <TextInput 
                            style={{ fontSize: 14, textAlign: 'left',flex:1,color:'white',marginTop:15}}
                            placeholder="请输入商家或者商品名称"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            numberOfLines={1}
                            ref={'content'}
                            multiline={true}
                            autoFocus={true}
                            onChangeText={(text) => {
                               content = text;
                            }}
                      />
                </View>
                <View style={{width:44,height:44,justifyContent:'flex-end',alignItems:'center',flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>{this.topItemAction(0)}}>
                         <Image source={require('../imgs/home/ic_home_top_search.png')} 
                           style={{width:16,height:16,marginRight:10,alignItems:'center',marginTop:15}}/>
                    </TouchableOpacity>
                </View>  
          </View>
          <View style={{height:40,flexDirection:'row'}}>
                <View style={{marginLeft:10,justifyContent:'center'}}><Text style={{color:'#777'}}>历史搜索</Text></View>
                <View style={{marginRight:10,alignItems:'flex-end',flex:1}}>
                    <TouchableOpacity style={{justifyContent:'center',alignItems:'center',flex:1}}>
                         <Text style={{color:'#777'}}>清空记录</Text>
                    </TouchableOpacity>
                </View>
          </View>
          <ShortLine/>
          <TouchableOpacity onPress={()=>{this.onPressItem(0)}}>
            <View style={{flex:1}}>
                 {this.renderContent(this.state.dataSource.cloneWithRows(
                           this.state.searchDatas === undefined ? [] : this.state.searchDatas))}
            </View>
          </TouchableOpacity>
          
      </View>
    );
  }
}
let styles = StyleSheet.create({
});
export default Search;