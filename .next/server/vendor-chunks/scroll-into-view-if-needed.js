"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/scroll-into-view-if-needed";
exports.ids = ["vendor-chunks/scroll-into-view-if-needed"];
exports.modules = {

/***/ "(ssr)/./node_modules/scroll-into-view-if-needed/dist/index.cjs":
/*!****************************************************************!*\
  !*** ./node_modules/scroll-into-view-if-needed/dist/index.cjs ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var t=__webpack_require__(/*! compute-scroll-into-view */ \"(ssr)/./node_modules/compute-scroll-into-view/dist/index.cjs\");const o=t=>!1===t?{block:\"end\",inline:\"nearest\"}:(t=>t===Object(t)&&0!==Object.keys(t).length)(t)?t:{block:\"start\",inline:\"nearest\"};module.exports=function(e,r){if(!e.isConnected||!(t=>{let o=t;for(;o&&o.parentNode;){if(o.parentNode===document)return!0;o=o.parentNode instanceof ShadowRoot?o.parentNode.host:o.parentNode}return!1})(e))return;const n=(t=>{const o=window.getComputedStyle(t);return{top:parseFloat(o.scrollMarginTop)||0,right:parseFloat(o.scrollMarginRight)||0,bottom:parseFloat(o.scrollMarginBottom)||0,left:parseFloat(o.scrollMarginLeft)||0}})(e);if((t=>\"object\"==typeof t&&\"function\"==typeof t.behavior)(r))return r.behavior(t.compute(e,r));const l=\"boolean\"==typeof r||null==r?void 0:r.behavior;for(const{el:a,top:i,left:c}of t.compute(e,o(r))){const t=i-n.top+n.bottom,o=c-n.left+n.right;a.scroll({top:t,left:o,behavior:l})}};//# sourceMappingURL=index.cjs.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc2Nyb2xsLWludG8tdmlldy1pZi1uZWVkZWQvZGlzdC9pbmRleC5janMiLCJtYXBwaW5ncyI6IkFBQWEsTUFBTSxtQkFBTyxDQUFDLDhGQUEwQixFQUFFLG1CQUFtQiw2QkFBNkIscURBQXFELGdDQUFnQyw2QkFBNkIseUJBQXlCLFFBQVEsS0FBSyxnQkFBZ0IsRUFBRSxvQ0FBb0Msb0VBQW9FLFNBQVMsWUFBWSxhQUFhLG1DQUFtQyxPQUFPLGlLQUFpSyxLQUFLLCtGQUErRix1REFBdUQsVUFBVSxrQkFBa0Isc0JBQXNCLDRDQUE0QyxVQUFVLHdCQUF3QixJQUFJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcXVlc3Rpb25mb3IvLi9ub2RlX21vZHVsZXMvc2Nyb2xsLWludG8tdmlldy1pZi1uZWVkZWQvZGlzdC9pbmRleC5janM/MjEwNSJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjt2YXIgdD1yZXF1aXJlKFwiY29tcHV0ZS1zY3JvbGwtaW50by12aWV3XCIpO2NvbnN0IG89dD0+ITE9PT10P3tibG9jazpcImVuZFwiLGlubGluZTpcIm5lYXJlc3RcIn06KHQ9PnQ9PT1PYmplY3QodCkmJjAhPT1PYmplY3Qua2V5cyh0KS5sZW5ndGgpKHQpP3Q6e2Jsb2NrOlwic3RhcnRcIixpbmxpbmU6XCJuZWFyZXN0XCJ9O21vZHVsZS5leHBvcnRzPWZ1bmN0aW9uKGUscil7aWYoIWUuaXNDb25uZWN0ZWR8fCEodD0+e2xldCBvPXQ7Zm9yKDtvJiZvLnBhcmVudE5vZGU7KXtpZihvLnBhcmVudE5vZGU9PT1kb2N1bWVudClyZXR1cm4hMDtvPW8ucGFyZW50Tm9kZSBpbnN0YW5jZW9mIFNoYWRvd1Jvb3Q/by5wYXJlbnROb2RlLmhvc3Q6by5wYXJlbnROb2RlfXJldHVybiExfSkoZSkpcmV0dXJuO2NvbnN0IG49KHQ9Pntjb25zdCBvPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHQpO3JldHVybnt0b3A6cGFyc2VGbG9hdChvLnNjcm9sbE1hcmdpblRvcCl8fDAscmlnaHQ6cGFyc2VGbG9hdChvLnNjcm9sbE1hcmdpblJpZ2h0KXx8MCxib3R0b206cGFyc2VGbG9hdChvLnNjcm9sbE1hcmdpbkJvdHRvbSl8fDAsbGVmdDpwYXJzZUZsb2F0KG8uc2Nyb2xsTWFyZ2luTGVmdCl8fDB9fSkoZSk7aWYoKHQ9Plwib2JqZWN0XCI9PXR5cGVvZiB0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiB0LmJlaGF2aW9yKShyKSlyZXR1cm4gci5iZWhhdmlvcih0LmNvbXB1dGUoZSxyKSk7Y29uc3QgbD1cImJvb2xlYW5cIj09dHlwZW9mIHJ8fG51bGw9PXI/dm9pZCAwOnIuYmVoYXZpb3I7Zm9yKGNvbnN0e2VsOmEsdG9wOmksbGVmdDpjfW9mIHQuY29tcHV0ZShlLG8ocikpKXtjb25zdCB0PWktbi50b3Arbi5ib3R0b20sbz1jLW4ubGVmdCtuLnJpZ2h0O2Euc2Nyb2xsKHt0b3A6dCxsZWZ0Om8sYmVoYXZpb3I6bH0pfX07Ly8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguY2pzLm1hcFxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/scroll-into-view-if-needed/dist/index.cjs\n");

/***/ })

};
;