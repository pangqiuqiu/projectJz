(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6d15b402"],{3769:function(e,t,r){"use strict";var n=r("86c5"),a=r.n(n);a.a},"86c5":function(e,t,r){},d5ed:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",[n("el-header",[n("div",[n("img",{attrs:{src:r("cf05"),alt:""}})]),n("h2",[e._v("欢迎入驻")])]),n("el-main",[n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:12,offset:6}},[n("label",[e._v("公司名称")]),n("el-input",{attrs:{placeholder:"请输入公司名称"},model:{value:e.formLabelAlign.name4s,callback:function(t){e.$set(e.formLabelAlign,"name4s",t)},expression:"formLabelAlign.name4s"}})],1)],1),n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:12,offset:6}},[n("label",[e._v("公司所在城市")]),n("el-select",{attrs:{placeholder:"请选择省份"},on:{"visible-change":function(t){return e.dropDownProvince(t)},change:e.changeP},model:{value:e.formLabelAlign.provinceid,callback:function(t){e.$set(e.formLabelAlign,"provinceid",t)},expression:"formLabelAlign.provinceid"}},e._l(e.provinceAry,(function(e){return n("el-option",{key:e.provinceid,attrs:{label:e.province,value:e.provinceid}})})),1),n("el-select",{attrs:{disabled:e.isDisabledCity,placeholder:"请选择城市"},on:{"visible-change":function(t){return e.dropDownCity(t)}},model:{value:e.formLabelAlign.city,callback:function(t){e.$set(e.formLabelAlign,"city",t)},expression:"formLabelAlign.city"}},e._l(e.cityAry,(function(e){return n("el-option",{key:e.cityid,attrs:{label:e.city,value:e.city}})})),1)],1)],1),n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:12,offset:6}},[n("label",[e._v("公司地址")]),n("el-input",{attrs:{placeholder:"请输入公司地址"},model:{value:e.formLabelAlign.companyAddress,callback:function(t){e.$set(e.formLabelAlign,"companyAddress",t)},expression:"formLabelAlign.companyAddress"}})],1)],1),n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:12,offset:6}},[n("label",[e._v("门店地址")]),n("el-input",{attrs:{placeholder:"请输入门店详细地址"},on:{blur:e.blurInput},model:{value:e.formLabelAlign.address,callback:function(t){e.$set(e.formLabelAlign,"address",t)},expression:"formLabelAlign.address"}})],1)],1),n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:12,offset:6}},[n("div",{attrs:{id:"allmap"}})])],1),n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:12,offset:6}},[n("label",[e._v("所属品牌")]),n("el-select",{attrs:{filterable:"",multiple:"",placeholder:"请选择品牌"},on:{"visible-change":function(t){return e.dropDownBrand(t)}},model:{value:e.formLabelAlign.brand,callback:function(t){e.$set(e.formLabelAlign,"brand",t)},expression:"formLabelAlign.brand"}},e._l(e.brandAry,(function(e,t){return n("el-option",{key:t,attrs:{label:e,value:e}})})),1)],1)],1),n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:12,offset:6}},[n("label"),n("el-button",{staticStyle:{margin:"100px 0",width:"400px"},attrs:{type:"primary",disabled:e.isDisabledForm},on:{click:e.submit}},[e._v("提交")])],1)],1)],1)],1)},a=[],l=(r("498a"),r("96cf"),r("1da1")),i={data:function(){return{formLabelAlign:{name4s:"",provinceid:"",city:"",address:"",companyAddress:"",brand:[],token:"",lat:"",lng:""},lat:"",lng:"",address:"",provinceAry:[],cityAry:[],brandAry:[]}},computed:{isDisabledCity:function(){return""===this.formLabelAlign.provinceid},isDisabledForm:function(){return""===this.formLabelAlign.name4s.trim()||""===this.formLabelAlign.provinceid||""===this.formLabelAlign.city||""===this.formLabelAlign.address.trim()||""===this.formLabelAlign.companyAddress.trim()||0===this.formLabelAlign.brand.length}},mounted:function(){this.$nextTick((function(){this.baiduMap()}))},methods:{baiduMap:function(){var e=this,t=new BMap.Map("allmap"),r=new BMap.Point(116.331398,39.897445);t.centerAndZoom(r,18),t.enableScrollWheelZoom();var n=new BMap.Geocoder;n.getPoint(this.formLabelAlign.address,(function(r){r?(t.centerAndZoom(r,16),t.addOverlay(new BMap.Marker(r)),e.formLabelAlign.lat=r.lat,e.formLabelAlign.lng=r.lng):alert("您选择地址没有解析到结果!")}),"安徽省"),this.address=this.formLabelAlign.address},blurInput:function(){this.formLabelAlign.address!==this.address&&this.baiduMap()},dropDownProvince:function(e){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function r(){var n,a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(!0!==e){r.next=6;break}return r.next=3,t.$http.post("/area/getProvince");case 3:n=r.sent,a=n.data,t.provinceAry=a;case 6:case"end":return r.stop()}}),r)})))()},changeP:function(){this.formLabelAlign.city=""},dropDownCity:function(e){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function r(){var n,a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(!0!==e){r.next=6;break}return r.next=3,t.$http.post("/area/getCityByPid",{provinceId:t.formLabelAlign.provinceid});case 3:n=r.sent,a=n.data,t.cityAry=a;case 6:case"end":return r.stop()}}),r)})))()},dropDownBrand:function(e){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function r(){var n,a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(!0!==e){r.next=6;break}return r.next=3,t.$http.post("/dealer/getDealerBrand");case 3:n=r.sent,a=n.data,t.brandAry=a;case 6:case"end":return r.stop()}}),r)})))()},submit:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=e.$route.query.id,e.formLabelAlign.token=r,t.next=4,e.$http.post("/dealer/addDealer",e.formLabelAlign);case 4:if(n=t.sent,""!==n.data){t.next=7;break}return t.abrupt("return");case 7:e.$router.push({path:"/all",query:{id:n.data}});case 8:case"end":return t.stop()}}),t)})))()}}},o=i,s=(r("3769"),r("2877")),c=Object(s["a"])(o,n,a,!1,null,"045b248a",null);t["default"]=c.exports}}]);