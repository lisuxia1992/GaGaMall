/**
 * 首页广告Action操作
 */
'use strict';

import {InteractionManager} from 'react-native';
import * as types from '../common/ActionTypes';
import FetchHttpClient, { form,header } from 'fetch-http-client';
import {ADVERHOST,CATEGORY_ADRESS,CLASSIFY_INFOMATION} from  '../common/Request';

import { toastShort } from '../utils/ToastUtil';

const client = new FetchHttpClient(ADVERHOST);
// 获取首页广告
export function performAdverAction(callback){
	requestAction(callback,ADVERHOST+'/11');
}
// 获取首页中间的广告
export function fetchCenterAdver(callback){
  requestAction(callback,ADVERHOST+'/7');
}

// 获取首页top分类
export function fetchGroupCategory(callback)
{
  requestAction(callback,CATEGORY_ADRESS+'/3');
}

// 获取首页center分类信息
export function fetchClassify(callback)
{
  requestAction(callback,CLASSIFY_INFOMATION+'/1')
}

function requestAction(callback,adress){
  InteractionManager.runAfterInteractions(() => {
      var responseResult = requestData(adress,'GET');
      responseResult.then((result)=>{
          // alert(result.msg);
          if (result.code === 200) {
            
              var responseArr = new Array();
              result.data.map(function (data) {
                  responseArr.push(data);
              })
              callback(responseArr);
          }
      })
    });
}

function requestData(url,method,body){

  return new Promise((resolve, reject) => {
    fetch(url, {
        headers: {
             // 'apikey': '8a9283a0567d5bea01567d5beaf90000',
             'Accept': 'application/json',
             'Content-Type': 'application/x-www-form-urlencoded',
          },
        method: method,
        body: body,
      })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        return result;
      })
      .then((responseData) => {
          resolve(responseData);
      })
      .catch((error) => {
          reject(error);
      });
  })
}

function request(url, method, body) {
  var isOk;
  return new Promise((resolve, reject) => {
    fetch(url, {
        method: method,
        body: body,
      })
      .then((response) => {
        if (!response.error) {
          isOk = true;
        } else {
          isOk = false;
        }
        return response.json();
      })
      .then((responseData) => {
        if (isOk) {
          resolve(responseData);
        } else {
          reject(responseData);
        }
      })
      .catch((error) => {
        reject(error);
      });
  })
}