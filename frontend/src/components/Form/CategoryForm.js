import React from 'react'

const CategoryForm = ({handleSubmit,value,setValue,isUpdate}) => {
  return (
    <>
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
        <input type="text" className="form-control" placeholder='Enter new category' 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
        />
    </div>
    <button type="submit" className="btn btn-primary">{isUpdate ? 'Update' : 'Add'}</button>
    </form>

    </>
  )
}

export default CategoryForm