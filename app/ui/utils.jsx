const onChangeHandler = (field, value, setState) => {
    setState(prevState => {
        let newData = { ...prevState };
        newData[field] = value;
        return newData;
    });
}

export default onChangeHandler;
