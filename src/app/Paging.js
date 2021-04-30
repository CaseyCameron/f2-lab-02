import { Component } from 'react';
import './Paging.css';

export default class Paging extends Component {

  // handleSubmit = (e) => {
  //   e.preventDefault();
  // }

  handlePrev = () => this.props.onPaging(-1);
  handleNext = () => this.props.onPaging(1);

  render() {
    const onPaging = this.props.onPaging;
    return (
      <div className="Paging">
        <button onClick={this.handlePrev}>◀</button>
        <span>#</span>
        <button onClick={this.handleNext}>▶</button>
      </div>
    );
  }

}