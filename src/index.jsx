import Post from "@model/Post";
import * as $ from 'jquery';
import '@/styles/style.css'
import json from '@/assets/json';
import logo from '@/assets/shirt-1484581597-4c846174ba7947428a9eb719fc67d295.jpg';
import file from '@/assets/example.xml';
import fileCsv from '@/assets/grades.csv';
import '@/styles/less.less';
import '@/styles/scss.scss'
import '@/babel'
import React from 'react';
import {render} from 'react-dom';

const App = () => {
    return (
        <div className="container">
            <h1>WebPack Course</h1>
            <hr/>
            <div className="logo"/>
            <hr/>
            <pre/>
            <hr/>
            <div className="box">
                <h1>Less</h1>
            </div>
            <hr/>
            <div className="box1">
                <h1>Sass</h1>
            </div>
        </div>
    )
};
render(<App/>, document.getElementById('app'));
const post = new Post('new post web pack', logo);
$('pre').html(post.toStringPost());
console.log(post.toStringPost());
console.log(json);
console.log(file);
console.log(fileCsv);

