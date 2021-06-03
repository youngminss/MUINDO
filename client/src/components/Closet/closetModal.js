import React, { useState, createContext, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import styled from 'styled-components';
import TopComment from '../../components/AnalysisClothes/topComment';
import axios from 'axios';

import InfiniteScroll from 'react-infinite-scroll-component';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import GroupSelector from './groupSelector';
import { ModalContext } from '../../App';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e2b063',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // justifyContent: 'center',
    // // flexDirection: 'column',
    // alignItems: 'center',
    // // width: '100px',
    // // maxWidth: '1024px',
    // // minHeight: ' calc(100vh - 8.5rem)',
    // // backgroundColor: '#ececec',
    // // height: '80vw',

    display: 'flex',
    paddingTop: '70px',
    paddingBottom: '66px',
    // // justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    maxWidth: '350px',
    // minWidth: '340px',
    // minHeight: '73vh',
    height: '100vh',
    width: '100vw',
    flexDirection: 'column',
    // marginTop: '50px',
    border: 'solid 3px',
    borderRadius: '25px',
    // overflow: 'auto',
  },
  modalCloseBtn: {
    width: '25px',
    height: '25px',
  },
  modalTopContents: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  hiddenBtn: {
    visibility: 'hidden',
    width: '25px',
    height: '25px',
  },
  modalBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  modalBottomContent: {
    display: 'flex',
    flexDirection: 'column',
    // overflow: 'auto',
    height: '62vh',

    // justifyContent: 'center',
    alignItems: 'center',
  },
  modalClothesContainer: {
    display: 'flex',
    overflow: 'auto',
    width: '100vw',
    maxWidth: '350px',
    // height: '70vh',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: '20px',
    justifyContent: 'center',
    // width: '100%',
    // flexDirection: 'column',
  },
  individualClothesContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    border: 'solid 2px',

    width: '45%',
    margin: '5px',
  },
  modalImg: {
    width: '80%',
    height: '11vh',
    margin: '5px 5px',
  },
}));

function ModalCloseBtn() {
  const classes = useStyles();
  const { setOpenClosetModal } = useContext(ModalContext);
  const { setModalMode } = useContext(ModalContext);
  const handleClose = () => {
    setOpenClosetModal(false);
  };
  //   console.log({ modalMode });

  return (
    <ThemeProvider theme={theme}>
      <IconButton onClick={handleClose}>
        <CloseIcon className={classes.modalCloseBtn} />
      </IconButton>
    </ThemeProvider>
  );
}

export default function ClosetModal() {
  const classes = useStyles();
  // const { openClosetModal, setOpenClosetModal } = useContext(ModalContext);
  // const { modalMode, setModalMode } = useContext(ModalContext);
  // const { closetImg, setClosetImg } = useContext(ModalContext);
  // const { clothesList, setClothesList } = useContext(ModalContext);
  // const { condition, setCondition } = useContext(ModalContext);
  // const [filteredClothes, setFilteredClothes] = useState({});
  const PAGE_NUMBER = 1;

  const { openClosetModal, setOpenClosetModal } = useContext(ModalContext);
  const { modalMode, setModalMode } = useContext(ModalContext);
  const { closetImg, setClosetImg } = useContext(ModalContext);
  const { closetClothesShopUrl, setClosetClothesShopUrl } = useContext(ModalContext);
  const { clothesList, setClothesList } = useContext(ModalContext);
  const { condition, setCondition } = useContext(ModalContext);
  const [filteredClothes, setFilteredClothes] = useState({});
  const [page, setPage] = useState(PAGE_NUMBER);

  // const [condition, setCondition] = useState({
  //   // category: '캡/야구 모자',
  //   color: '검정색',
  //   price: 33000,
  // });

  // useEffect(() => {
  //   try {
  //     axios.get('http://localhost:3000/data/closet.json').then((res) => {
  //       let result = res.data.data;
  //       console.log(modalMode);

  //       // console.log(res.data.data['bag']);
  //       console.log(res.data.data[modalMode]);
  //       // console.log(typeof [1, 2, 3]);
  //       setClothesList(res.data.data[modalMode]);
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   return clothesList;
  // }, [modalMode, page]);

  //중요한 코드!!!!!!!!

  useEffect(() => {
    try {
      axios.get(`https://d591d186-daf2-497a-adf1-c4ed8820efdd.mock.pstmn.io/looks/items?type=${modalMode}`).then((res) => {
        // let result = res.data.data;
        // console.log(modalMode);
        console.log(res.data);

        // console.log(res.data.data['bag']);
        // console.log(res.data.data[modalMode]);
        // console.log(typeof [1, 2, 3]);
        setClothesList([...clothesList, ...res.data]);
      });
    } catch (err) {
      console.log(err);
    }
    // return clothesList;
  }, [modalMode, page]);
  console.log(modalMode);

  const scrollToEnd = () => {
    console.log('마지막');
    setTimeout(() => {
      setPage(page + 1);
    }, 1000);
  };

  const handleClose = () => {
    setOpenClosetModal(false);
  };

  const handleImageSelect = (event) => {
    setClosetImg({
      ...closetImg,
      [modalMode]: event.target.src,
    });
    setClosetClothesShopUrl({ ...closetClothesShopUrl, [modalMode]: event.target.alt });
    console.log(closetClothesShopUrl);
    console.log(event.target);
    setOpenClosetModal(false);
  };

  const a = (event) => {
    console.log(event.target);
  };

  useEffect(() => {
    var subFilteredClothes = clothesList
      ? // ?

        clothesList.filter(function (item) {
          for (var key in condition) {
            if (item[key] === undefined || item[key] !== condition[key]) return false;
          }
          return true;
        })
      : [];
    setFilteredClothes(subFilteredClothes);
  }, [clothesList, condition]);

  return (
    <div>
      <Modal
        className={classes.root}
        open={openClosetModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openClosetModal}>
          <div className={classes.modal}>
            <div className={classes.modalTopContents}>
              <div className={classes.hiddenBtn}>
                <ModalCloseBtn />
              </div>
              <div className={classes.modalBtnContainer}>
                {/* <LuxuryBtn onClick={handleInitializeClick}>초기화</LuxuryBtn> */}
                <GroupSelector />
              </div>

              <div>
                <ModalCloseBtn />
              </div>
            </div>

            {modalMode ? (
              <div className={classes.modalBottomContent}>
                <div className={classes.modalClothesContainer} id="scrollableDiv">
                  {/* <InfiniteScroll
                    dataLength={filteredClothes.length}
                    next={() => scrollToEnd()}
                    hasMore={true}
                    loader={<h1 style={{ textAlign: 'center' }}>Loading..🕵️‍♂️</h1>}
                    scrollableTarget="scrollableDiv"
                  > */}
                  {Object.keys(condition).length !== 0
                    ? Array.isArray(filteredClothes) &&
                      filteredClothes.map(function (image, i) {
                        return (
                          <div className={classes.individualClothesContainer}>
                            {/* <div onClick={a}> */}
                            <img
                              className={classes.modalImg}
                              alt={filteredClothes[i]['shop_url']}
                              src={filteredClothes[i]['url']}
                              onClick={handleImageSelect}
                            />
                            {/* </div> */}
                            <a href={filteredClothes[i]['shop_url']} target="_blank" title="무신사에서 상품 보기" rel="noreferrer">
                              <div>{filteredClothes[i]['brand']}</div>
                              <div>{filteredClothes[i]['item_name']}</div>
                              <div>{filteredClothes[i]['price']}</div>
                            </a>
                            {/* </InfiniteScroll> */}
                          </div>
                        );
                      })
                    : Array.isArray(clothesList) &&
                      clothesList.map(function (image, i) {
                        return (
                          <div className={classes.individualClothesContainer} id="scrollableDiv">
                            <InfiniteScroll
                              dataLength={clothesList.length}
                              next={() => scrollToEnd()}
                              hasMore={true}
                              // loader={<h1 style={{ textAlign: 'center' }}>Loading..🕵️‍♂️</h1>}
                              scrollableTarget="scrollableDiv"
                            >
                              {/* <div className={clothesList[i]['item_url']} onClick={a}> */}
                              <img
                                className={classes.modalImg}
                                alt={clothesList[i]['musinsa']}
                                src={clothesList[i]['url']}
                                onClick={handleImageSelect}
                              />
                              {/* </div> */}
                              <a href={clothesList[i]['musinsa']} target="_blank" title="무신사에서 상품 보기" rel="noreferrer">
                                <div>{clothesList[i]['brand']}</div>
                                <div>{clothesList[i]['name']}</div>
                                <div>{clothesList[i]['price']}</div>
                              </a>
                            </InfiniteScroll>
                          </div>
                        );
                      })}
                  {filteredClothes.length === 0 ? <div>결과가 없습니다</div> : <></>}
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const LuxuryBtn = styled.button`
  display: inline-block;
  box-sizing: border-box;
  max-width: 160px;
  min-width: 100px;
  width: 5vw;
  background: transparent;
  text-transform: uppercase;
  font-weight: 500;
  font-style: normal;
  font-size: 15px;
  letter-spacing: 0.3em;
  color: rgba(223, 190, 106, 0.7);
  border-radius: 0;
  padding: 15px 20px 15px 20px;
  transition: all 0.7s ease-out;
  cursor: pointer;
  white-space: pre-wrap;
  text-align: center;
  background: linear-gradient(270deg, rgba(223, 190, 106, 0.8), rgba(146, 111, 52, 0.8), rgba(34, 34, 34, 0), rgba(34, 34, 34, 0));
  background-position: 1% 50%;
  background-size: 300% 300%;
  text-decoration: none;
  margin: 5px 15px 5px 15px;
  border: none;
  border: 1px solid rgba(223, 190, 106, 0.3);
  :hover {
    color: #fff;
    border: 1px solid rgba(223, 190, 106, 0);
    color: $white;
    background-position: 99% 50%;
  }
  :disabled {
    background-position: 1% 50%;
    color: rgba(223, 190, 106, 0.7);
    border: 1px solid rgba(223, 190, 106, 0.3);
    cursor: default;
  }
`;
