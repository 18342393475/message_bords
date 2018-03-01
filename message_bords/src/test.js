import "../style/index.css";
import React from "react";
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import {Provider,connect} from 'react-redux';

window.onload=function(){
	
	ReactDOM.render(
		<Provider store={store}>
	    <App />
	  </Provider>,
		  document.getElementById('root')
	);
	ReactDOM.render(
		<Provider store={store}>
		    <Nums />
		  </Provider>,
		  document.getElementById('num')
	);
	
}

class Header extends React.Component{
		constructor(...args){
			super(...args)
		
		}
		addClick(){
			var text=this.refs.input.value;
			console.log(text);
			this.props.click(text);		
		}
		render(){
			const {list} = this.props;
			console.log(this.props);
			var arr=[];
			list.map((v,index)=>{
				arr.push(<li key={index}>{v}</li>)
			})
			console.log(list);
			
			return <div>
						<input type="text" ref="input"/>
						<button onClick={this.addClick.bind(this)}>提交</button>
						<ul>
							{arr}
						</ul>
					</div>
		}
		
}

class Num extends React.Component{
		constructor(...args){
			super(...args)
		
		}
		
		render(){
			const {list} = this.props;
		
			return <div>
						共{list.length}条信息
					</div>
		}
		
}


// Reducer
function reducer(state ={list:["hello world"]}, action) {
  switch (action.type) {
    case 'add':
    	console.log(action);
      var arr=[action.text];
      Array.prototype.push.apply(arr,state.list);
      console.log(arr);
      return {list:arr};
    default:
      return state
  }
}

// Store
const store = createStore(reducer);

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    list:state.list
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    click: (text) => dispatch({ type: 'add',text})
  }
}


// Connected Component
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

const Nums=connect(
	mapStateToProps,
	mapDispatchToProps
)(Num)
