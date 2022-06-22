import { Table, Tag } from "antd";
import GistMeta from "../GistMeta/GistMeta";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Datatable.css";
import { SETSELECTEDGIST } from "../../globals/constants/actionTypes";
import { IGistRecord } from "../../api/types";
import type { ColumnsType } from 'antd/lib/table';
import { PublicGistsContext } from "../../contexts/publicGistsContext/provider";

export type DatatableProps = {
  data: IGistRecord[],
  loading: boolean,
  onPageChange: Function
}

function Datatable({ data, loading, onPageChange }: DatatableProps) {
  let navigate = useNavigate();
  const {state, publicGistDispatch} = useContext(PublicGistsContext);


  const columns: ColumnsType<IGistRecord>  = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      render: (text, record, index) => (
        <GistMeta isInTable={true} gist={record.gist} />
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "12%",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      width: "8%",
    },
    {
      title: "Keyword",
      dataIndex: "keyword",
      key: "keyword",
      width: "16%",
      render: (text, record, index) => text && text.slice(0, 25) + "...",
    },
    {
      title: "Notebook Name",
      dataIndex: "notebook",
      key: "notebook",
      width: "32%",
      render: (text, record, index) =>
        record.notebook.map((file, index) =>
          index < 5 ? <Tag key={index}>{file}</Tag> : null
        ),
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      width: "8%",
      render: (text, record, index) => {},
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      scroll={{ y: 600 }}
      loading={loading}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        total: 1000,
        onChange: (page, pageSize) => onPageChange(page, pageSize),
      }}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            // setSelectedGist(record.gist);
            publicGistDispatch({
              type: SETSELECTEDGIST,
              payload: record.gist
            })
            navigate(`/gist/${record.gist.id}`);
          },
        };
      }}
    />
  );
}

export default React.memo(Datatable);
