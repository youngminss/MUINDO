import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MyPageDetail from '../../components/MyPage/myPageDetail';
import axios from 'axios';
import { useHistory } from 'react-router';

import { ModalContext } from '../../App';

export default function MyPageClosetDetail() {
  const history = useHistory();
  const { seq } = useParams();
  const { setClosetDetailInfo } = useContext(ModalContext);

  const [myLookBookInfo, setMyLookBookInfo] = useState([]);
  const [lookBookPrice, setLookBookPrice] = useState(0);

  useEffect(() => {
    try {
      axios.get(`http://elice-kdt-ai-track-vm-distribute-12.koreacentral.cloudapp.azure.com:5000/mypage/my-looks/${seq}`, {}).then((res) => {
        const detailInfoArr = [];
        detailInfoArr.push(res.data.hat, res.data.top, res.data.bottom, res.data.shoes, res.data.bag);
        // console.log(detailInfoArr);

        const notNulDetailInfoArr = [];
        for (var i = 0; i < detailInfoArr.length; i++) {
          if (detailInfoArr[i] !== null) {
            notNulDetailInfoArr.push(detailInfoArr[i]);
          }
        }
        // console.log(notNulDetailInfoArr);

        var clothesPrice = 0;
        for (var m = 0; m < notNulDetailInfoArr.length; m++) {
          clothesPrice += parseInt(notNulDetailInfoArr[m]['price']);
        }
        setLookBookPrice(clothesPrice);
        setClosetDetailInfo(notNulDetailInfoArr);
        setMyLookBookInfo(res.data.my_look);
      });
    } catch (err) {
      history.push('/error');
      console.log(err);
    }
  }, [history, seq, setClosetDetailInfo]);

  // console.log(lookBookPrice);

  return <MyPageDetail lookBookPrice={lookBookPrice} myLookBookInfo={myLookBookInfo} page="myClosetDetail" goToListPath="/my_page_closet_list" />;
}
