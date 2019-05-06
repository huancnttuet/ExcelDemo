import React from 'react';

// import axios from 'axios';
import TopPage from './TopPage';
import Content from './Content'
import BottomPage from './BottomPage';
class App extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     selectedFile : null,
  //     name: '',
  //     result: '',
  //     gravity: '',
  //     viscosity: '',
  //     porosity: '',
  //     oil_saturation: '',
  //     formation_type: '',
  //     permeability: '',
  //     net_thinkness: '',
  //     depth: '',
  //     temperature: '',
  //     output:''
  //   }
  //   this.onChangeHandler = this.onChangeHandler.bind(this);
  //   this.onClickHandler = this.onClickHandler.bind(this);
  // }
  // onChangeHandler(event){
  //   this.setState({
  //     selectedFile: event.target.files[0],
  //     loaded : 0
  //   })
  //   if(event.target.files[0] == null){
  //     this.setState({name:'null'})
  //   } else
  //   this.setState({name: event.target.files[0].name})
  // }
  // onClickHandler = () =>{
  //   const data = new FormData();
  //   console.log(this.state.selectedFile);
  //   data.append('foo', this.state.selectedFile)
  //   axios.post("http://localhost:8000/upload", data, {
  //     // receive two    parameter endpoint url ,form data
  // }).then(res => { // then print response status
  //
  //   this.setState({result: res.data.message})
  //   })
  // }
  //
  // onChangeHandler2 = event => {
  //   this.setState({gravity: event.target.value})
  // }
  // onChangeHandler3 = event => {
  //   this.setState({viscosity: event.target.value})
  // }
  // onChangeHandler4 = event => {
  //   this.setState({porosity: event.target.value})
  // }
  // onChangeHandler5 = event => {
  //   this.setState({oil_saturation: event.target.value})
  // }
  // onChangeHandler6 = event => {
  //   this.setState({formation_type: event.target.value})
  // }
  // onChangeHandler7 = event => {
  //   this.setState({permeability: event.target.value})
  // }
  // onChangeHandler8 = event => {
  //   this.setState({net_thinkness: event.target.value})
  // }
  // onChangeHandler9 = event => {
  //   this.setState({depth: event.target.value})
  // }
  // onChangeHandler10 = event => {
  //   this.setState({temperature: event.target.value})
  // }
  //
  // onClickHandler2 = () => {
  //   // var data = new FormData();
  //   // data.set('gravity', this.state.gravity)
  //   // data.set('viscosity', this.state.viscosity)
  //   // data.set('porosity', this.state.porosity)
  //   // data.set('oil_saturation', this.state.oil_saturation)
  //   // data.set('formation_type', this.state.formation_type)
  //   // data.set('permeability', this.state.permeability)
  //   // data.set('net_thinkness', this.state.net_thinkness)
  //   // data.set('depth', this.state.depth)
  //   // data.set('temperature', this.state.temperature)
  //
  //   axios.get('http://localhost:8000/process', {
  //     params: {
  //       gravity: this.state.gravity,
  //       viscosity: this.state.viscosity,
  //       porosity: this.state.porosity,
  //       oil_saturation: this.state.oil_saturation,
  //       formation_type: this.state.formation_type,
  //       permeability: this.state.permeability,
  //       net_thinkness: this.state.net_thinkness,
  //       depth: this.state.depth,
  //       temperature: this.state.temperature
  //     }
  //   }).then((res)=> {
  //     console.log(res);
  //     this.setState({output: res.data.nameMethod})
  //   }).catch((res) => {
  //     console.log(res);
  //   })
  // }

  render(){
    return (
      <div>
        <TopPage />

        <Content />

        <BottomPage />
      </div>
    );
  }
}

export default App;
