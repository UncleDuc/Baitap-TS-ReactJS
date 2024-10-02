import React, { useState } from 'react';
import { Table, Upload,Button, Input } from 'antd';
import type { TableProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface DataType {
  key: string;
  file: File | null;
  preview: string;
  Size: string;
  content: string;

}

const App: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  function handleUpload(file:File, index:number){
    const reader = new FileReader(); // FileReader: là một API cho phép đọc nội dung của file
    reader.onload = (e) => { // Hàm này sẽ được kích hoạt khi FileReader hoàn tất việc đọc file.
      const newDataSource = [...dataSource];
      newDataSource[index] = {
        ...newDataSource[index],
        file:file,
        preview: e.target?.result as string, // Đây là kết quả của việc đọc file, được trả về dưới dạng một chuỗi
        Size:(file.size / 1024).toFixed(2) + 'kb',
      }
      setDataSource(newDataSource);
    };
    reader.readAsDataURL(file); // FileReader bắt đầu đọc file dưới dạng Base64 URL
  };

  function addColumn(){
    const newDataSource = [...dataSource, {
      key : `${dataSource.length}`,
      file:null,
      preview:'',
      Size:'',
      content:''
    }];
    setDataSource(newDataSource);
  };

  function handleContentChange(value:string, index:number){
    const newDataSource = [...dataSource]; // Tạo một bản sao mới của dataSource để đảm bảo tính bất biến, tránh thay đổi trực tiếp state
    newDataSource[index] = {...newDataSource[index],content:value}; // tại vị trí ô nhập content, chèn thêm giá trị content
    setDataSource(newDataSource);
  }

  function handleSumbit(){
    console.log("info:", dataSource);
  }
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Upload',
      dataIndex: 'file',
      render: (_, record, index) => (
        <Upload beforeUpload={(file)=>{
          handleUpload(file, index);
          return false;
        }}
        showUploadList={true}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      )
    },
    {
      title: 'preview',
      dataIndex: 'preview',
      render: (preview) => preview && <img src={preview} alt='preview' style={{width:'200px'}}/>
    },
    {
      title: 'Size',
      dataIndex: 'Size',
    },
    {
      title: 'content',
      dataIndex:'content',
      render : (_,record, index) => (
        <Input 
          style={{width:'full'}}
          placeholder="nhập mô tả" 
          value={record.content}
          onChange={(e)=>handleContentChange(e.target.value, index)}
          />
          
      )
    }
  ];

    return(
      <div style={{margin:'100px' ,padding:'20px', background:'#ddd', width:'1000px'}}>
        <Button onClick={addColumn} type="primary" style={{ marginBottom: 16 }}>
          Thêm hàng
        </Button>
        <Table<DataType>
          columns={columns}
          dataSource={dataSource}
          pagination={false}
        />
        <Button type="primary" style={{padding:'8px', marginTop:'8px'}} onClick={handleSumbit}>submit</Button>
    </div>
    )
};

export default App;