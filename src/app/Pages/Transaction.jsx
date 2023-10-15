import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Header from '../../component/Nav/Header';
import { SectionStyles } from '../../style/styles.';
import { useDispatch, useSelector } from 'react-redux';
import { GetTransactions, UpdateTransaction } from '../../store/services/transaction';
import { Button, Carousel, Input, Popconfirm, Select, Table } from 'antd';
import Modal from '../../component/Modal/Modal';
import { ThemeContextAPI } from '../../context/useContext';
import { clearMessage } from '../../store/slice/messageSlice';
import { Notification } from '../../component/Notification/Notification';
import { GetCards } from '../../store/services/giftCard';
import { EditFilled } from '@ant-design/icons';
import { Upload } from '../../store/services/upload';

const Section = styled.section`
  ${SectionStyles}
`;

const Status = [
  {
    key: 1,
    label: 'PENDING',
    value: 'PENDING',
  },
  {
    key: 3,
    label: 'APPROVED',
    value: 'APPROVED',
  },
  {
    key: 4,
    label: 'DECLINED',
    value: 'DECLINED',
  },
];

const Transaction = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false);
  const [showImage, setShowImage] = React.useState({
    open: false,
    image: [],
    saving: false,
  });
  const { setFormdata, formdata } = React.useContext(ThemeContextAPI);
  const [selectedRowKeys, setSelectedRowKeys] = useState(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const { transactions, isGetting, isUpdating } = useSelector((state) => state.transaction);
  const { message } = useSelector((state) => state.message);
  const { giftcards } = useSelector((state) => state.giftcard);

  const [dataSource] = useState([
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'CategoryName',
      dataIndex: 'categoryname',
    },
    {
      title: 'Country',
      dataIndex: 'country',
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
    },
    {
      title: 'Profit',
      dataIndex: 'profit',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ]);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'CategoryName',
      dataIndex: 'categoryname',
    },
    {
      title: 'Country',
      dataIndex: 'country',
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
    },
    {
      title: 'Profit',
      dataIndex: 'profit',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Want to update?"
            onConfirm={() => {
              setFormdata((p) => ({
                ...p,
                controls: {
                  ...p.controls,
                  amount: record?.amount,
                  remarks: record?.remarks,
                  status: record?.status?.toUpperCase(),
                  blob: record?.screenshotImagesList,
                },
              }));
              setSelectedRowKeys(record?.key);
              setShowModal(true);
            }}
          >
            <EditFilled />
          </Popconfirm>
        ) : null,
    },
  ];

  const handleInputChange = (data, value, name) => {
    setFormdata((s) => ({
      ...s,
      controls: {
        ...s.controls,
        [name]: !value ? data.target.value : value.label,
      },
    }));
  };
  useEffect(() => {
    const fetchTran = () => {
      const data = '';
      dispatch(GetTransactions({ data }));
    };

    fetchTran();
  }, [dispatch]);

  const UpdateRecord = async () => {
    setIsSaving(true);
    const { status, remarks, amount, images } = formdata.controls;
    const id = selectedRowKeys;
    const data = {
      status,
      remarks,
      amount,
    };

    const imageList = await Upload({ images, setIsSaving });

    data.screenshotImagesList = imageList;

    // console.log(data);
    // setIsSaving(false);
    dispatch(UpdateTransaction({ id, data, setShowModal, setSelectedRowKeys, setIsSaving }));
  };

  const displayCard = useMemo(() => {
    if (giftcards && giftcards.length > 0 && transactions && transactions.length > 0) {
      let data = transactions.map((item) => {
        let card = giftcards.find((c) => c.id === item.giftCardId);
        if (card && card.id) {
          return {
            ...item,
            giftCard: {
              id: card?.id,
              adminRate: card?.adminRate,
              cardRate: card?.cardRate,
              duration: card?.duration,
              name: card?.name,
              profit: card?.profit,
              rate: card?.rate,
              rmbRate: card?.rmbRate,
              type: card?.type,
              category: card?.category,
              denomination: card?.denomination,
            },
          };
        }

        return item;
      });

      return data;
    } else {
      return [];
    }
  }, [transactions, giftcards]);

  const TableData = useMemo(() => {
    return displayCard && displayCard.length > 0
      ? displayCard
          .map((item) => {
            return {
              key: item.id,
              date: new Date(item.date).toLocaleString(),
              name: item?.giftCard?.name,
              type: item.type,
              amount: item.amount,
              categoryname: item?.giftCard?.category?.categoryName,
              country: item?.giftCard?.category?.country?.name,
              currency: item?.giftCard?.category?.country?.currency,
              rate: item?.giftCard?.rate,
              profit: item?.giftCard?.profit,
              status: item.status,
              image: item.imageList,
              screenshotImagesList: item?.screenshotImagesList,
            };
          })
          ?.sort((a, b) => new Date(b.date) - new Date(a.date))
      : [];
  }, [displayCard]);

  useEffect(() => {
    let mounted = true;
    if (mounted && message !== '') {
      if (message === 'Updated Successfully') {
        Notification({
          type: 'success',
          message,
        });
      } else if ((message && message?.status === 500) || (message && message?.status === 401)) {
        if (message === undefined || message === 'undefined') return;
        Notification({
          type: 'error',
          message: 'Something went wrong',
        });
      }
    }

    return () => {
      dispatch(clearMessage());
      mounted = false;
    };
  }, [message, dispatch, showModal]);

  useEffect(() => {
    const getCard = () => {
      const data = '';
      dispatch(GetCards({ data }));
    };

    getCard();
  }, [dispatch]);

  const downloadimage = () => {
    setShowImage((p) => ({
      ...p,
      saving: true,
    }));
    showImage?.image?.length > 0 &&
      showImage.image.map((c) => {
        const links = c.imageUrl;
        const type = c?.imageUrl?.slice(-3);
        fetch(links, {
          method: 'GET',
          headers: {},
        })
          .then((response) => {
            response.arrayBuffer().then(function (buffer) {
              const url = window.URL.createObjectURL(new Blob([buffer]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', `image.${type && type.includes('jpg') ? 'jpg' : 'png'}`); //or any other extension
              document.body.appendChild(link);
              link.click();
            });
            alert('Image downloaded');
            setShowImage((p) => ({
              ...p,
              saving: false,
            }));
          })
          .catch((err) => {
            setShowImage((p) => ({
              ...p,
              saving: false,
            }));
            alert(err, 'error');
          });
      });
  };

  const handleImage = (e, name) => {
    if (formdata?.controls?.images.length > 0) {
      if (e.target.files?.length > 0) {
        for (let i = 0; i < e.target.files?.length; i++) {
          setFormdata((s) => ({
            ...s,
            controls: {
              ...s.controls,
              images: [...s.controls.images, e.target.files[i]],
            },
          }));
        }
      } else {
        setFormdata((s) => ({
          ...s,
          controls: {
            ...s.controls,
            images: [...s.controls.images, e.target.files],
          },
        }));
      }

      return;
    } else if (formdata?.controls?.images.length === 0) {
      if (e.target.files?.length > 0) {
        for (let i = 0; i < e.target.files?.length; i++) {
          setFormdata((s) => ({
            ...s,
            controls: {
              ...s.controls,
              images: [...s.controls.images, e.target.files[i]],
            },
          }));
        }

        return;
      }

      setFormdata((s) => ({
        ...s,
        controls: {
          ...s.controls,
          images: [e.target.files],
        },
      }));
    }
  };

  const removeImage = (id) => {
    const newData = formdata.controls.blob?.filter((c) => c.id !== id);
    const newImages = formdata.controls.images?.filter((c, i) => i !== id);

    setFormdata((s) => ({
      ...s,
      controls: {
        ...s.controls,
        images: newImages,
        blob: newData,
      },
    }));
  };

  useEffect(() => {
    let objectUrl = [];

    if (formdata?.controls?.images.length > 0) {
      for (let i = 0; i < formdata?.controls?.images?.length; i++) {
        objectUrl.push({ id: i, url: URL.createObjectURL(formdata?.controls?.images[i]) });
      }
      setFormdata((s) => ({
        ...s,
        controls: {
          ...s.controls,
          blob: objectUrl,
        },
      }));
    }
  }, [formdata?.controls?.images]);

  return (
    <Section>
      <Modal
        open={showImage.open}
        title="Transaction Images"
        handleSumbit={downloadimage}
        okText={'Download Image'}
        handleCancel={() => {
          setShowImage((p) => ({
            saving: false,
            open: false,
            image: [],
          }));
        }}
        confirmLoading={showImage.saving}
      >
        <Carousel autoplay effect="fade" dots={false} draggable>
          {showImage && showImage.image?.length > 0
            ? showImage.image.map((item) => (
                <div style={contentStyle}>
                  <img
                    src={item.imageUrl}
                    alt={item.publicId}
                    style={{ width: '100%', objectFit: 'cover', height: '300px' }}
                    width={'100%'}
                  />
                </div>
              ))
            : ''}
        </Carousel>
      </Modal>
      <Modal
        open={showModal}
        handleCancel={() => {
          setSelectedRowKeys(null);
          setShowModal(false);
          setFormdata((p) => ({
            ...p,
            controls: {
              ...p.controls,
              images: [],
              blob: [],
            },
          }));
        }}
        title="Update Transaction"
        handleSumbit={UpdateRecord}
        loading={isSaving}
      >
        <div>
          <label>Amount</label>
          <Input
            type="text"
            name="amount"
            rows={4}
            value={formdata?.controls?.amount}
            onChange={(data, value) => handleInputChange(data, value, 'amount')}
            style={{ width: '100%', height: '40px' }}
          />
        </div>
        <div>
          <label>Status</label>
          <Select
            options={Status}
            value={formdata?.controls?.status}
            onChange={(data, value) => handleInputChange(data, value, 'status')}
            style={{ width: '100%', height: '40px' }}
          />
        </div>
        <div>
          <label>Remark</label>
          <Input.TextArea
            type="text"
            name="remark"
            rows={4}
            value={formdata?.controls?.remarks}
            onChange={(data, value) => handleInputChange(data, value, 'remarks')}
            style={{ width: '100%', height: '40px' }}
          />
        </div>
        <div style={{ marginTop: '2rem' }}>
          <input type="file" multiple onChange={handleImage} accept="image/*,.pdf" />
        </div>

        <div style={{ marginTop: '2rem' }}>
          {formdata?.controls.blob?.length > 0 &&
            formdata?.controls.blob.map((item, i) => (
              <>
                <img src={item.url ? item.url : item.uri} key={i} alt={item.url} width={'100%'} height={'300px'} />
                <span onClick={() => removeImage(i)}>Delete</span>
              </>
            ))}
        </div>
      </Modal>
      <Header title={'Transaction'} />
      <main>
        <Table
          loading={isGetting === 'loading'}
          // rowSelection={rowSelection}
          columns={columns}
          dataSource={TableData}
          scroll={{ x: true, scrollToFirstRowOnChange: true }}
          expandable={{
            expandedRowRender: (record) => (
              <Button
                onClick={() =>
                  setShowImage({
                    open: true,
                    image: record?.image,
                    saving: false,
                  })
                }
              >
                View Images
              </Button>
            ),
            rowExpandable: (record) => record.id !== 'Not Expandable',
          }}
        />
      </main>
    </Section>
  );
};

export default Transaction;

const contentStyle = {
  height: '300px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
