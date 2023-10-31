import { Button } from 'react-bootstrap';

export const ClassInfoAdminComponent = ({ setClassInfo, classInfo }) => {
  return (
    <>
      <div id="info-box-wrapper"></div>

      <div id="info-box">
        <h2>{classInfo.day}</h2>
        <h3>{`${classInfo.start} - ${classInfo.end}`}</h3>
        <h4>{`${classInfo.name} ${classInfo.lastName}`}</h4>
        <span>
          <b>Email:</b> {classInfo.email}
        </span>
        <br />
        <span>
          <b>Phone:</b> {classInfo.phoneNumber}
        </span>
        <br />
        {classInfo.comment && (
          <>
            <span>
              <b>Comment:</b>
              <br />
              {classInfo.comment}
            </span>
            <br />
          </>
        )}

        <Button style={{ width: "100px", border: "#edac07 3px solid" }} className="mt-2 mx-auto d-block" variant="warning" onClick={e => setClassInfo({})}>
          Hide
        </Button>
      </div>
    </>
  )
};


