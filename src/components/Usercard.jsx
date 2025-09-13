

const Usercard = ({user}) => {
  console.log(user);
  const {firstName, lastName, age, gender, photoUrl, about,skills} = user
  
  return (
    <div className="card bg-base-300 w-96 shadow-sm rounded-xl">
  <figure>
    <img
      src={photoUrl}
      alt="userPhoto" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName +" "+ lastName}</h2>
    {about && (<p>{about}</p>)}
    {age &&  (<p>{age}</p>)}
    {gender && (<p>{gender}</p>)}
     {skills && (<p>{skills}</p>)}
    <div className="card-actions justify-center  py-5 ">
      <button className="btn btn-primary rounded-lg">Pass</button>
      <button className="btn btn-secondary rounded-lg">Like </button>
    </div>
  </div>
</div>
  )
}

export default Usercard