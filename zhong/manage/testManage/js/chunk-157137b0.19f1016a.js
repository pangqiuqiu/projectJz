(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-157137b0"],{"32f4":function(e,t,r){"use strict";var n=r("a34d"),a=r.n(n);a.a},a34d:function(e,t,r){},f6ca:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",[n("el-header",[n("div",[n("img",{attrs:{src:r("cf05"),alt:""}})]),n("div",{staticClass:"head"},[n("h2",[e._v("欢迎入驻")]),n("div",{staticClass:"login",on:{click:e.logined}},[e._v("立即登录")])])]),n("el-main",[n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:12,offset:6}},[n("label",[e._v("手机号")]),n("el-input",{attrs:{placeholder:"请输入手机号"},on:{blur:e.judgeMobile},model:{value:e.formLabelAlign.phone,callback:function(t){e.$set(e.formLabelAlign,"phone",t)},expression:"formLabelAlign.phone"}})],1)],1),n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:12,offset:6}},[n("label",[e._v("设置密码")]),n("el-input",{attrs:{placeholder:"请输入密码"},model:{value:e.formLabelAlign.psd1,callback:function(t){e.$set(e.formLabelAlign,"psd1",t)},expression:"formLabelAlign.psd1"}})],1)],1),n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:12,offset:6}},[n("label",[e._v("确认密码")]),n("el-input",{attrs:{placeholder:"请确认密码"},model:{value:e.formLabelAlign.psd2,callback:function(t){e.$set(e.formLabelAlign,"psd2",t)},expression:"formLabelAlign.psd2"}})],1)],1),n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:12,offset:6}},[n("label",[e._v("验证码")]),n("el-input",{staticStyle:{width:"270px","margin-right":"20px"},attrs:{placeholder:"请输入验证码"},model:{value:e.formLabelAlign.code,callback:function(t){e.$set(e.formLabelAlign,"code",t)},expression:"formLabelAlign.code"}}),n("el-button",{attrs:{disabled:e.isDisabled,type:"success"},on:{click:e.code}},[e._v(e._s(e.codetime?e.codetime+"s后重新获取":"发送验证码"))])],1)],1),n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:12,offset:6}},[n("div",[n("label"),n("el-checkbox",{model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}},[e._v("我已看过并同意 "),n("el-button",{attrs:{type:"text"},on:{click:e.agreement}},[e._v("《用户协议》")])],1)],1),n("div",[n("label"),n("el-button",{staticStyle:{width:"400px"},attrs:{type:"primary",disabled:e.isDisabledForm},on:{click:e.submit}},[e._v("注册")])],1)])],1)],1)],1)},a=[],l=(r("498a"),r("96cf"),r("1da1")),o=/^[1]([3-9])[0-9]{9}$/,s={data:function(){return{checked:!1,codetime:0,isDisabled:!1,formLabelAlign:{phone:"",psd1:"",psd2:"",code:""}}},computed:{isDisabledForm:function(){return!0!==this.checked||0===this.formLabelAlign.psd1.trim().length||this.formLabelAlign.psd1!==this.formLabelAlign.psd2||4!==this.formLabelAlign.code.trim().length||!1!==this.isDisabled}},methods:{judgeMobile:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(o.test(e.formLabelAlign.phone)){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,e.$http.post("/user/phoneYz",{phone:e.formLabelAlign.phone});case 4:r=t.sent,!0!==r.data?(e.$message.error("手机号已被注册"),e.isDisabled=!0):!0===r.data&&(e.isDisabled=!1);case 6:case"end":return t.stop()}}),t)})))()},code:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(o.test(e.formLabelAlign.phone)){t.next=2;break}return t.abrupt("return",e.$message.error("请输入正确的手机号"));case 2:if(!(e.codetime>0)){t.next=4;break}return t.abrupt("return");case 4:return e.codetime=60,r=setInterval((function(){e.codetime--,e.codetime<1&&(clearInterval(r),e.codetime=0)}),1e3),t.next=8,e.$http.post("/user/sendCode",{phone:e.formLabelAlign.phone});case 8:case"end":return t.stop()}}),t)})))()},agreement:function(){var e=this.$router.resolve("/agreement"),t=e.href;window.open(t,"_blank")},submit:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(o.test(e.formLabelAlign.phone)){t.next=2;break}return t.abrupt("return",e.$message.error("手机号不合法"));case 2:return t.next=4,e.$http.post("/user/addUser0",{phone:e.formLabelAlign.phone,password:e.formLabelAlign.psd1,code:e.formLabelAlign.code});case 4:r=t.sent,!0===r.data?e.$router.push("/login"):e.$message.error("注册失败");case 6:case"end":return t.stop()}}),t)})))()},logined:function(){this.$router.push("/login")}}},i=s,c=(r("32f4"),r("2877")),u=Object(c["a"])(i,n,a,!1,null,"f0aa0c8e",null);t["default"]=u.exports}}]);