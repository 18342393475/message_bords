import "../style/index.css";
import React from "react";
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import {Provider,connect} from 'react-redux';


var content_data=[
		{time:'2018-02-27 18:16:16',content:'你好吗，我是留言1'},{time:'2018-02-28 18:16:16',content:'你好吗，我是留言2'},{time:'2018-02-29 18:16:16',content:'你好吗，我是留言3'}
	].reverse();
	

//const  store=createStore(render);

window.onload=function(){
	ReactDOM.render(
		<Provider store={store}>
		    <Headers />
		  </Provider>,
		  document.getElementById('header')
	);
	ReactDOM.render(
		  <Provider store={store}>
	    <Contents />
	  </Provider>,
		  document.getElementById('content')
	);
	ReactDOM.render(
		  <Provider store={store}>
		    <Footers />
		  </Provider>,
		  document.getElementById('footer')
	);
	
}
	
	function render(state={list:content_data},action){
		switch(action.type){
			case 'add':
				var arr=[{content:action.text,time:action.time}];
				Array.prototype.push.apply(arr,state.list);
				return {list:arr};
			case 'del':
				var arr=[];
				Array.prototype.push.apply(arr,state.list)
				arr.splice(action.index,1);
				return {list:arr};
			default:
				return state
		}
	}
	
	
	class Header extends React.Component{
		constructor(...args){
			super(...args)
			
		}
		clickFn(){
			
			let elem=this.refs.textarea;
			let val=elem.value;
			elem.value='';
			if(val){
				var date=new Date();
				var arr=[],arr2=[];
				arr.push(date.getFullYear());
				var month=date.getMonth()+1;
				month=month<10?'0'+month:month;
				arr.push(month);
				var day=date.getDate();
				day=day<10?'0'+day:day;
				arr.push(day);
				
				var hours=date.getHours();
				hours=hours<10?'0'+hours:hours;
				arr2.push(hours);
				var minutes=date.getMinutes();
				minutes=minutes<10?'0'+minutes:minutes;
				arr2.push(minutes);
				var seconds=date.getSeconds();
				seconds=seconds<10?'0'+seconds:seconds;
				arr2.push(seconds);
				
				var time=arr.join("-")+' '+arr2.join(":");
				console.log(time,val);
				this.props.onaddClick(time,val)
				
			}
		}
		render(){
			const  { content_data, onaddClick } = this.props
			return <div>
				<textarea ref="textarea" placeholder="说点什么吧......"></textarea>
				<input type="button" value="提交" className="fr" onClick={this.clickFn.bind(this)} id="btn" />
			</div>
		}
	}
			
	class Content extends React.Component{
		constructor(...args){
			super(...args)
		}
		delClick(e){
			const target=e.target||e.srcElement;
			const index=target.getAttribute("data-index");
			console.log(index);
			this.props.delClick(index);
		}
		render(){
			const list=this.props.list;
			console.log(this.props);
			var arr=[];
			list.map((v,i)=>{
				arr.push(<div key={i}  className="content_sub">
					{v.content}<div className="time"><span data-index={i} className="del" onClick={this.delClick.bind(this)}>删除</span>{v.time}</div>
				</div>)
			})
			return <div>{arr}</div>
		}
	}
	
	class Footer extends React.Component{
		constructor(...args){
			super(...args)
		}
		render(){
			var len=this.props.list.length;
			return len?<div>共{len}条信息</div>:<div>抱歉暂无信息~</div>
		}
	}
	

	

// Store
const store = createStore(render)

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    list: state.list
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onaddClick: (time,text) => dispatch({ type: 'add',time,text}),
    delClick:(index)=>dispatch({type:'del',index})
  }
}


// Connected Component
const Headers = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

const Contents=connect(
	mapStateToProps,
	mapDispatchToProps
)(Content)

const Footers=connect(
	mapStateToProps,
	mapDispatchToProps
)(Footer)
