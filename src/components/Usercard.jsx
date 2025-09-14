const Usercard = ({ user }) => {
  console.log(user);
  const { firstName, lastName, age, gender, photoUrl, about, skills } = user;

  return (
    <div className="card bg-base-300 w-80 h-[480px] shadow-sm rounded-xl overflow-hidden">
      <figure className="h-56 w-full flex items-center justify-center bg-black">
        <img
          src={photoUrl}
          alt="userPhoto"
          className="max-h-full max-w-full object-contain"
        />
      </figure>
      <div className="card-body overflow-y-auto">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {about && <p>{about}</p>}
        {age && <p>{age}</p>}
        {gender && <p>{gender}</p>}
        {skills && <p>{skills}</p>}
        <div className="card-actions justify-center py-5">
          <button className="btn btn-primary rounded-lg">Pass</button>
          <button className="btn btn-secondary rounded-lg">Like</button>
        </div>
      </div>
    </div>
  );
};

export default Usercard;
