import React, { useRef, useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { debounce } from '../../../utils';
import { useNavigate } from "react-router";
import Icon from '../../../component/common/icon'

interface IProps {
  newQuery: any
  handleQuery: (q: any) => any,
  back: () => any
}

const SearchBox = (props: IProps) => {
  const queryRef: any = useRef();
  const [query, setQuery] = useState('');

  const navigate = useNavigate()

  const historyBack = () => {
    navigate(-1)
  }

  const { newQuery ,handleQuery } = props;

  const handleQueryDebounce = useMemo(() => {
    return debounce(handleQuery, 500);
  }, [handleQuery]);

  useEffect(() => {
    queryRef.current.focus();
  }, []);

  useEffect(() => {
    handleQueryDebounce(query);
    // eslint-disable-next-line 
  }, [query]);

  useEffect(() => {
    if (newQuery !== query) {
      setQuery(newQuery);
    }
    // eslint-disable-next-line
  }, [newQuery]);

  const handleChange = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setQuery(event.currentTarget.value);
  };

  const clearQuery = () => {
    setQuery('');
    queryRef.current.focus();
  }


  return (
    <SearchBoxWrapper>
      <Icon type={'back'}
        className={"icon-back"}
        color={'#xe655'}
        onClick={() => historyBack()}/>
      <input ref={queryRef}
        className="box"
        placeholder="搜索歌曲、歌手、专辑"
        value={query}
        onChange={(e) => handleChange(e as any)} />
      <Icon type={'delete'} 
        className={`icon-delete ${query ? 'show' : 'hidden'}`}
        color={'#xe600'}
        onClick={clearQuery} />
    </SearchBoxWrapper>
  )
};

export default React.memo(SearchBox);

const SearchBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  padding-right: 20px;
  height: 40px;
  background: ${props => props.theme.color};
  .icon-back{
    font-size: 24px;
    color: ${props => props.theme.fontColorLight};
  }
  .box{
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background:  ${props => props.theme.color};
    color: ${props => props.theme.fontColorLight};
    font-size: ${props => props.theme.fontsizem};
    outline: none;
    border: none;
    border-bottom: 1px solid ${props => props.theme.borderColor};
    &::placeholder{
      color: ${props => props.theme.fontColorLight};
    }
  }
  .icon-delete{
    font-size: 16px;
    color: ${props => props.theme.backgroundColor};
  }
  .show {
    display: blcok;
  }
  .hidden {
    display: none;
  }
`