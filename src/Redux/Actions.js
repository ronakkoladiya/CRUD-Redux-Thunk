export const submitAllData = (formData) => {
    return{
        type: 'submitAllData',
        payload: formData
    }
};

export const updateAllData = (mydata) => {
    return{
        type: 'updateAllData',
        payload: mydata
    }
};

export const deleteUser = (index) => {
    return{
        type: 'deleteUser',
        payload: index
    }
};

export const deleteAll = () => {
    return{
        type: 'deleteAll',
    }
};