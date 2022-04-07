
export const filtereditems = ({ filterData, data, setSearchField,itemName }) => {
  if (data?.payload) {
    const filtered = data.payload?.items.filter(
      item => {
        return (
          itemName
            .toLowerCase()
            .includes(filterData.toLowerCase())
        );
      }
    );
    setSearchField(filtered);
  }
}
