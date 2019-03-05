import React from 'react'

const Search = props => {
  let { changeHandler } = props;

  return (
    <div className="ui search">
      <div className="ui icon input">
        <input className="prompt" type="text" placeholder="Search Plants" onChange={changeHandler}/>
        <i className="search icon"></i>
      </div>
    </div>
  )
}

export default Search;
