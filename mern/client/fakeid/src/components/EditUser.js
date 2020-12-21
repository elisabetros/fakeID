import React, { useEffect, useState } from "react";

export default function EditUser(props) {
  let { user } = props;

  const [values, setValues] = useState({
    name: "",
    address: "",
    maritalStatusId: "",
    spouseId: "",
    childId: "",
  });

  const [availableSpouses, setSpouses] = useState();
  const [availableChildren, setChildren] = useState();

  const url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (user) {
      setValues({
        name: user.name,
        address: user.address,
        maritalStatusId: user.maritalStatusId,
        spouseId: user.spouse ? user.spouse._id : "",
        childId: null,
      });
    }
    if (user && user.age >= 18 && !user.CVR) {
      const url = process.env.REACT_APP_API_URL;
      const fetchSpouses = async () => {
        try {
          const response = await fetch(`${url}/users/${user._id}/spouses`);
          const spouses = await response.json();
          if (response.status === 200) {
            setSpouses(spouses);
            console.log(spouses);
          }
        } catch (err) {
          if (err) {
            console.log(err);
            return;
          }
        }
      };

      const fetchChildren = async () => {
        try {
          const response = await fetch(`${url}/users/${user._id}/children`);
          const children = await response.json();
          setChildren(children);
        } catch (err) {
          if (err) {
            console.log(err);
            return;
          }
        }
      };
      fetchSpouses();
      fetchChildren();
    }
  }, [user]);

  const handleChange = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const submitChange = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${url}/users/${user._id}`, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (!data.error) {
        props.updateUser(values);
        props.onNotification({
          message: "User updated",
          type: "success",
        });
      } else {
        props.onNotification({
          message: data.error,
          type: "error",
        });
      }
    } catch (err) {
      props.onNotification({
        message: "Something went wrong, please try again",
        type: "error",
      });
    }
  };

  return (
    <form>
      <div className="formField">
        <label htmlFor="name">Name</label>
        <input
          name="name"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          value={values.name}
        />
      </div>

      <div className="formField">
        <label htmlFor=""> Address </label>
        <select
          name="address"
          id="addressSelect"
          placeholder="Select Address"
          onChange={handleChange}
          defaultValue={
            values.address === "Lygten 17, 2400 Norrebro"
              ? "Lygten 17, 2400 Norrebro"
              : "Lygten 37, 2400 Norrebro"
          }
        >
          <option value="Lygten 17, 2400 Norrebro">Lygten 17</option>
          <option value="Lygten 37, 2400 Norrebro">Lygten 37</option>
        </select>
      </div>

      {user.age >= 18 && !user.CVR ? (
        <>
          <div className="formField">
            <label htmlFor="name">Marital Status</label>
            <select
              name="maritalStatusId"
              id="maritalStatus"
              onChange={handleChange}
              value={values.maritalStatusId}
            >
              <option value="1"> Single</option>
              <option value="2"> Married</option>
              <option value="3"> Divorced</option>
              <option value="4"> Widow</option>
              <option value="5"> Registered Partnership</option>
              <option value="6"> Abolition of Registered Partnership</option>
              <option value="7"> Deceased</option>
              <option value="8"> Unknown</option>
            </select>
          </div>

          <div className="formField">
            {!user.spouse ? (
              <>
                <label htmlFor="name">Select spouse</label>
                <select
                  name="spouseId"
                  id="spouseSelect"
                  onChange={handleChange}
                  defaultValue="Select Spouse"
                >
                  <option value="Select Spouse" disabled>
                    Select Spouse
                  </option>
                  {availableSpouses && availableSpouses.length ? (
                    availableSpouses.map((spouse) => {
                      return (
                        <option key={spouse._id} value={spouse._id}>
                          {spouse.name}
                        </option>
                      );
                    })
                  ) : (
                    <option disabled>No available spouses</option>
                  )}
                </select>
              </>
            ) : (
              <>
                <label htmlFor="name">Spouse</label>
                <input type="text" readOnly value={user.spouse.name} />
              </>
            )}
          </div>

          <div className="formField">
            <label htmlFor="name">Add child</label>
            <select
              name="childId"
              id="childSelect"
              onChange={handleChange}
              defaultValue="Add child"
            >
              <option value="Add child" disabled>
                Select Child
              </option>
              {availableChildren && availableChildren.length ? (
                availableChildren.map((child) => {
                  return (
                    <option key={child._id} value={child._id}>
                      {child.name}
                    </option>
                  );
                })
              ) : (
                <option disabled>No available Children</option>
              )}
            </select>
          </div>
        </>
      ) : null}

      <input type="submit" value="Edit User" onClick={submitChange} />
    </form>
  );
}
