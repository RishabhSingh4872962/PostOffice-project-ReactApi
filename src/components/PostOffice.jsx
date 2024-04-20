import React from 'react'

const PostOffice = ({postOffice}) => {
    // console.log(postOffice);
    const {Name,BranchType,DeliveryStatus,District,Division}=postOffice
  return (
    <div style={{border:"2px solid Black",borderRadius:"5px",padding:"6px",width:"300px",height:"300px",display:"flex" ,flexDirection:"column",flexWrap:"wrap",justifyContent:"space-around",alignItems:"flex-start"}}>
        <span>Name: {Name}</span>
        <span>BranchType: {BranchType}</span>
        <span>DeliveryStatus: {DeliveryStatus}</span>
        <span>District: {District}</span>
        <span>Division: {Division}</span>
    </div>
  )
}

export default PostOffice