import React, { useState } from 'react';
import { Table, Upload,Button } from 'antd';
import type { TableProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface DataType {
  key: string;
  file: File | null;
  preview: string;
  Size: string;

}

const App: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  function handleUpload(file:File, index:number){
    const reader = new FileReader();
    reader.onload = (e) => {
      const newDataSource = [...dataSource];
      newDataSource[index] = {
        ...newDataSource[index],
        file:file,
        preview: e.target?.result as string,
        Size:(file.size / 1024).toFixed(2) + 'kb',
      }
      setDataSource(newDataSource);
    };
    reader.readAsDataURL(file);
  };

  function addColumn(){
    const newDataSource = [...dataSource, {
      key : `${dataSource.length}`,
      file:null,
      preview:'',
      Size:''
    }];
    setDataSource(newDataSource);
  };

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Upload',
      dataIndex: 'file',
      render: (_, record, index) => (
        <Upload beforeUpload={(file)=>{
          handleUpload(file, index);
          return false;
        }}
        showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      )
    },
    {
      title: 'preview',
      dataIndex: 'preview',
      render: (preview) => preview && <img src={preview} alt='preview' style={{width:'400px',height:'200px'}}/>
    },
    {
      title: 'Size',
      dataIndex: 'Size',
    },
  ];

    return(
      <div style={{margin:'100px' ,padding:'20px', background:'#ddd', width:'500px'}}>
        <Button onClick={addColumn} type="primary" style={{ marginBottom: 16 }}>
          Thêm hàng
        </Button>
        <Table<DataType>
          columns={columns}
          dataSource={dataSource}
          pagination={false}
        />
    </div>
    )
};

export default App;