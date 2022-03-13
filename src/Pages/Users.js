import React, { useState, useEffect } from "react";
import Popup from "../components/Popup";
import Table from "../components/Table";
import { usePopup } from "../hooks/PopupProvider";
import { useRowContext } from "../hooks/RowProvider";
import { TableHeadEnums } from "../Others/enums";
import { removeHyphen } from "../Others/helper";

export default function Users() {
  const [tableList, setTableList] = useState([]);
  const [tableListCopy, setTableListCopy] = useState([]);
  const { popupOpen } = usePopup();
  const {
    currentRow,
    currentColumn,
    currentPage,
    searchString,
  } = useRowContext();

  useEffect(() => {
    !!currentPage &&
      fetch(`https://randomuser.me/api/?page=${currentPage}&results=10`)
        .then((data) => data.json())
        .then((data) => {
          setTableList(data.results);
          setTableListCopy(data.results);
        });
  }, [currentPage]);

  useEffect(() => {
    const filteredByUserName = [...tableList].filter((u) =>
      u.login.username.toLowerCase().startsWith(searchString)
    );
    setTableList(!!searchString ? filteredByUserName : tableListCopy);
  }, [searchString]);

  return (
    <div className="container">
      <div className="logo">
        <img src="/images/logo.jpg" alt="logo" />
      </div>
      <Table columns={UserTableElements} rows={tableList} />
      {!!popupOpen && currentColumn === "picture" ? (
        <Popup open={popupOpen} style={{ width: "150px" }}>
          <div>
            <img src={currentRow?.picture?.large} alt="large" />
          </div>
        </Popup>
      ) : null}

      {!!popupOpen && currentColumn === "username" ? (
        <Popup open={popupOpen} style={{ width: "400px" }} classSelect="medium">
          <div className="profile-block">
            <h4>
              {currentRow?.name?.title +
                ". " +
                currentRow?.name?.first +
                " " +
                currentRow?.name?.last}
            </h4>
            <div className="thumbnail">
              <img src={currentRow?.picture?.thumbnail} alt="Thumbnail" />
            </div>
            <br />
            <h5>{currentRow?.login?.username}</h5>
            <h6>({currentRow?.gender})</h6>
            <br />
            <p>{currentRow?.email}</p>
            <p>{removeHyphen(currentRow?.phone)}</p>
            <p>{`${currentRow?.location?.street?.number}, ${currentRow?.location?.street?.name}, ${currentRow?.location?.city}, ${currentRow?.location?.country}, ${currentRow?.location?.postcode}`}</p>
          </div>
        </Popup>
      ) : null}
    </div>
  );
}

const UserTableElements = [
  {
    label: "Full name",
    type: TableHeadEnums.CUSTOM_DATA,
    name: "name",
    Render: (data) => (
      <>
        {data?.name?.title + ". " + data?.name?.first + " " + data?.name?.last}
      </>
    ),
  },
  {
    label: "User name",
    type: TableHeadEnums.CUSTOM_DATA,
    name: "username",
    Render: (data) => {
      const { setPopupOpen } = usePopup();
      const { setCurrentRow, setCurrentColumn } = useRowContext();

      const handleNameClick = () => {
        setPopupOpen(true);
        setCurrentRow(data);
        setCurrentColumn("username");
      };

      return (
        <div onClick={handleNameClick} className="link">
          {data?.login?.username}
        </div>
      );
    },
  },
  {
    label: "Email",
    type: TableHeadEnums.STRING,
    name: "email",
  },
  {
    label: "DOB",
    type: TableHeadEnums.DATE,
    name: "dob",
  },
  {
    label: "Address",
    type: TableHeadEnums.CUSTOM_DATA,
    name: "location",
    Render: (data) => (
      <>{`${data?.location?.street?.number}, ${data?.location?.street?.name}, ${data?.location?.city}, ${data?.location?.country}, ${data?.location?.postcode}`}</>
    ),
  },
  {
    label: "Phone number",
    type: TableHeadEnums.PHONE,
    name: "phone",
  },
  {
    label: "Picture",
    type: TableHeadEnums.CUSTOM_DATA,
    name: "picture",
    Render: (data) => {
      const { setPopupOpen } = usePopup();
      const { setCurrentRow, setCurrentColumn } = useRowContext();

      const handleImageClick = () => {
        setPopupOpen(true);
        setCurrentRow(data);
        setCurrentColumn("picture");
      };

      return (
        <div className="thumbnail" onClick={handleImageClick}>
          <img src={data?.picture?.thumbnail} alt="Thumbnail" />
        </div>
      );
    },
  },
];
