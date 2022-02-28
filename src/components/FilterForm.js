const FilterForm = (props) => {
  return (
    <form>
      <label>Filter by category</label>
      <select
        name="category"
        selected={props.onSelectedFilter}
        onChange={props.onChangingFilter}
      >
        <option value="All">All</option>
        <option value="Food">Food</option>
        <option value="Home">Home</option>
        <option value="Others">Others</option>
      </select>
    </form>
  );
};

export default FilterForm;
