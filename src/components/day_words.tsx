import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Grid, PageHeader } from 'react-bootstrap';
import { AuthContext } from '../providers/auth_provider';
import Editor from './editor';
import MonthTimeline from './month_timeline';

const _moment = moment();
const INITIAL_EDITOR = { words: '', updated: '', disabled: false };

type DateFormat = {
  year: number;
  month: number;
  day: number;
};

const DayWords = () => {
  const backend_url = process.env.REACT_APP_BACKEND_URL;
  const auth = useContext(AuthContext);
  const [currentDate, setCurrentDate] = useState({
    year: Number(_moment.format('YYYY')),
    month: Number(_moment.format('MM')),
    day: Number(_moment.format('D'))
  });
  const [editor, setEditor] = useState(INITIAL_EDITOR);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    getWordsByDate(currentDate);
    getProgress();
  }, []);

  const getProgress = () => {
    axios({
      method: 'get',
      baseURL: backend_url,
      url: '/posts/progress',
      headers: { Authorization: `Bearer ${auth?.token}` }
    })
      .then((response: any) => {
        setProgress(response.data.progress);
      })
      .catch(() => setProgress([]));
  };

  const getWordsByDate = ({ year, month, day }: DateFormat) => {
    axios({
      method: 'get',
      baseURL: backend_url,
      url: '/post',
      headers: { Authorization: `Bearer ${auth?.token}` },
      params: {
        date: `${year}/${month}/${day}`
      }
    })
      .then((response: any) => {
        setEditor({ ...editor, words: response.data.post.content });
      })
      .catch((err: any) => console.log(err));
  };

  const onSubmit = () => {
    const currentTime = moment().format('HH:mm:ss');

    axios({
      method: 'post',
      baseURL: backend_url,
      url: '/posts',
      headers: { Authorization: `Bearer ${auth?.token}` },
      data: {
        post: {
          content: editor.words,
          word_count: 750
        }
      }
    })
      .then(() => {
        setEditor({ ...editor, updated: currentTime });
      })
      .catch((error: any) => console.log(error));
  };

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setEditor({ ...editor, [name]: value });
  };

  const formatDate = ({ year, month, day }: any) =>
    moment(`${year}-${month}-${day}`, 'YYYY-MM-D').format('DD/MM/YYYY');

  const goalCheck = (d: number) => {
    const date = formatDate({ ...currentDate, day: d });
    return progress[date as any];
  };

  const onDaySelect = (d: number) => {
    // Disable click on future days
    if (d <= Number(_moment.format('D'))) {
      const displayDate = { ...currentDate, day: d };

      setCurrentDate(displayDate);
      setEditor({ ...editor, disabled: !(d === Number(_moment.format('D'))) });

      getWordsByDate(displayDate);
    }
  };

  return (
    <Grid>
      <PageHeader>
        Morning Words <small>Free your mind in 750 words</small>
      </PageHeader>
      <MonthTimeline
        {...currentDate}
        goalCheck={goalCheck}
        onDaySelect={onDaySelect}
      />
      <br />
      <Editor
        data={editor}
        minLength={750}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </Grid>
  );
};

export default DayWords;
