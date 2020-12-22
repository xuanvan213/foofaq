import React, { PureComponent } from "react";
import AsyncSelect from "react-select/async";
// import axios from "axios";
// import { listCategories } from "../QuestionForm";

class CategoriesInput extends PureComponent {
  state = { categories: this.props.categories };
  onChange = (categories) => {
    this.setState({
      categories: categories || [],
    });
    // listCategories.splice();
    // listCategories.push(this.state.categories);
    // console.log(listCategories);
  };

  loadOptions = async (inputText, callback) => {
    const res = await fetch(
      `https://5fc48ee536bc790016343a0b.mockapi.io/categories?name=${inputText}`
    );
    const json = await res.json();
    callback(json.map((i) => ({ label: i.name, value: i.id })));
  };
  render() {
    console.log(this.props.categories);
    return (
      <div>
        <AsyncSelect
          isMulti
          value={this.state.categories}
          onChange={this.onChange}
          placeholder={"Input..."}
          loadOptions={this.loadOptions}
        />
      </div>
    );
  }
}

export default CategoriesInput;
