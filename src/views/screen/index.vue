<template>
  <div id="screen_box" class="screen_box">
    <div class="layout_top">
      <Decoration5 :duration="2" class="top_bg" />
      <span class="title">O2O云实时数据监控平台</span>
    </div>
    <div class="layout_content">
      <div class="box_content content_left">
        <BorderBox1 class="data_box">
          <Decoration7 class="data_box_title_box">
            &nbsp;&nbsp;数据监控大图1&nbsp;&nbsp;
          </Decoration7>
          <div class="echartsOne" id="echartsOne"></div>
        </BorderBox1>
        <Decoration1
          style="width: 200px; height: 50px; margin: 20px 0; margin-top: 0"
        />
        <BorderBox1 class="data_box">
          <Decoration7 class="data_box_title_box">
            &nbsp;&nbsp;数据监控大图2&nbsp;&nbsp;
          </Decoration7>
          <div class="echartsThree" id="echartsThree"></div>
        </BorderBox1>
      </div>
      <div class="box_content content_center">
        <BorderBox10 class="content_center_top_box">BorderBox8</BorderBox10>
        <div class="content_center_bottom_box">
          <div class="echartsTwo" id="echartsTwo"></div>
        </div>
      </div>
      <div class="box_content content_right">
        <BorderBox1 class="data_box">
          <Decoration7 class="data_box_title_box">
            &nbsp;&nbsp;各科成绩排名&nbsp;&nbsp;
          </Decoration7>
          <div class="echartsFore" id="echartsFore"></div>
        </BorderBox1>
        <Decoration1
          style="width: 200px; height: 50px; margin: 20px 0; margin-top: 0"
        />
        <BorderBox1 class="data_box">
          <Decoration7 class="data_box_title_box">
            &nbsp;&nbsp;数据监控大图4&nbsp;&nbsp;
          </Decoration7>
          <div class="echartsFive" id="echartsFive"></div>
        </BorderBox1>
        <Decoration1
          style="width: 200px; height: 50px; margin: 20px 0; margin-top: 0"
        />
        <BorderBox1 class="data_box">
          <Decoration7 class="data_box_title_box">
            &nbsp;&nbsp;数据监控大图5&nbsp;&nbsp;
          </Decoration7>
          <div class="echartsSix" id="echartsSix"></div>
        </BorderBox1>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { onMounted, nextTick, onBeforeUnmount } from 'vue';
import autofit from 'autofit.js';
import {
  Decoration5,
  Decoration7,
  BorderBox1,
  Decoration1,
  BorderBox10,
} from '@dataview/datav-vue3';
defineOptions({
  name: 'screen',
});

const echartOneInit = () => {
  //获取DOM元素并初始化
  let myChart = echarts.init(document.getElementById('echartsOne'), 'dark');
  myChart.showLoading();
  // 指定图表的配置项和数据
  let option = {
    backgroundColor: 'rgba(0,0,0,0)',
    tooltip: {},
    radar: [
      {
        indicator: [
          {
            text: '<200',
            max: 10,
          },
          {
            text: '200-400',
            max: 10,
          },
          {
            text: '400-600',
            max: 10,
          },
          {
            text: '600-800',
            max: 10,
          },
          {
            text: '800-1000',
            max: 10,
          },
          {
            text: '>1000',
            max: 10,
          },
        ],
        center: ['35%', '50%'],
      },
    ],
    legend: {
      type: 'scroll',
      orient: 'vertical',
      left: '70%',
      top: 'center',
      icon: 'circle',
    },
    polar: {
      radius: '75%',
      center: ['35%', '50%'],
    },
    angleAxis: {
      zlevel: 0,
      min: 0,
      max: 360,
      interval: 5,
      clockwise: false,
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    radiusAxis: {
      zlevel: 0,
      min: 0,
      max: 10,
      minInterval: 1,
      axisLabel: {
        textStyle: {
          color: '#fff',
        },
      },
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        type: 'radar',
        lineStyle: {},
        symbol: 'none',
        areaStyle: {
          opacity: 0.3,
        },
        data: [
          {
            value: [1, 0, 0, 3, 2, 0],
            name: '猕猴',
          },
          {
            value: [0, 5, 7, 0, 1, 0],
            name: '林麝',
          },
          {
            value: [0, 0, 2, 0, 1, 1],
            name: '白鹇',
          },
          {
            value: [0, 0, 0, 0, 2, 0],
            name: '褐马鸡',
          },
          {
            value: [0, 1, 4, 0, 1, 0],
            name: '白鹳',
          },
          {
            value: [0, 0, 1, 2, 1, 0],
            name: '勺鸡',
          },
        ],
      },
    ],
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  myChart.hideLoading();
};

const echartTwoInit = () => {
  //获取DOM元素并初始化
  let myChart = echarts.init(document.getElementById('echartsTwo'), 'dark');
  myChart.showLoading();
  const offsetX = 20;
  const offsetY = 10;
  // 绘制左侧面
  const CubeLeft = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath: function (ctx: any, shape: any) {
      // 会canvas的应该都能看得懂，shape是从custom传入的
      const xAxisPoint = shape.xAxisPoint;
      // console.log(shape);
      const c0 = [shape.x, shape.y];
      const c1 = [shape.x - offsetX, shape.y - offsetY];
      const c2 = [xAxisPoint[0] - offsetX, xAxisPoint[1] - offsetY];
      const c3 = [xAxisPoint[0], xAxisPoint[1]];
      ctx
        .moveTo(c0[0], c0[1])
        .lineTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .closePath();
    },
  });
  // 绘制右侧面
  const CubeRight = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath: function (ctx: any, shape: any) {
      const xAxisPoint = shape.xAxisPoint;
      const c1 = [shape.x, shape.y];
      const c2 = [xAxisPoint[0], xAxisPoint[1]];
      const c3 = [xAxisPoint[0] + offsetX, xAxisPoint[1] - offsetY];
      const c4 = [shape.x + offsetX, shape.y - offsetY];
      ctx
        .moveTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .lineTo(c4[0], c4[1])
        .closePath();
    },
  });
  // 绘制顶面
  const CubeTop = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath: function (ctx: any, shape: any) {
      const c1 = [shape.x, shape.y];
      const c2 = [shape.x + offsetX, shape.y - offsetY]; // 右点
      const c3 = [shape.x, shape.y - offsetX];
      const c4 = [shape.x - offsetX, shape.y - offsetY];
      ctx
        .moveTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .lineTo(c4[0], c4[1])
        .closePath();
    },
  });
  // 注册三个面图形
  echarts.graphic.registerShape('CubeLeft', CubeLeft);
  echarts.graphic.registerShape('CubeRight', CubeRight);
  echarts.graphic.registerShape('CubeTop', CubeTop);

  let yData = [120, 220, 160, 280];
  let yData2 = [10, 50, 20, 30];
  let option = {
    backgroundColor: 'rgba(0,0,0,0)',
    legend: {
      show: true,
      right: 100,
      top: 0,
      itemGap: 30,
      itemWidth: 20,
      itemHeight: 10,
      data: ['时长', '占比'],
      textStyle: {
        fontSize: 16,
        color: '#ffffff',
      },
    },
    color: ['#E7D36B', '#26D6D7', '#43EFFF'],
    tooltip: {
      trigger: 'axis',
      textStyle: {
        fontSize: 18, // 字体大小
      },
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      top: '20%',
      left: '3%',
      right: '3%',
      bottom: '5%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['中考保电', '高考保电', '重大节日', '两大大节日'],
      axisLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: 'rgba(239, 247, 253, .1)',
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontSize: 16,
        color: '#E7FCFF',
        margin: 20,
      },
    },
    yAxis: [
      {
        type: 'value',
        name: '时长：天',
        nameGap: 30,
        nameTextStyle: {
          color: '#ffffff',
          fontWeight: 400,
          fontSize: 16,
        },
        axisLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: 'rgba(239, 247, 253, .1)',
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(239, 247, 253, .1)',
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          fontSize: 16,
          color: '#E7FCFF',
        },
        min: 0,
        max: Math.ceil(Math.max.apply(null, yData) / 5) * 5,
        interval: Math.ceil(Math.max.apply(null, yData) / 5),
      },
      {
        type: 'value',
        name: '%',
        nameGap: 30,
        nameTextStyle: {
          color: '#ffffff',
          fontWeight: 400,
          fontSize: 16,
        },
        axisLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: 'rgba(239, 247, 253, .1)',
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(239, 247, 253, .1)',
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          fontSize: 16,
          color: '#E7FCFF',
        },
      },
    ],
    series: [
      {
        name: '时长',
        type: 'custom',
        renderItem: (params: any, api: any) => {
          console.log(params);
          const location = api.coord([api.value(0), api.value(1)]);
          return {
            type: 'group',
            x: -20,
            children: [
              {
                type: 'CubeLeft',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: '#F4D363',
                    },
                    {
                      offset: 1,
                      color: '#1FD6DB',
                    },
                  ]),
                  stroke: 'rgba(3, 25, 63, .1)', //边框颜色
                },
              },
              {
                type: 'CubeRight',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: '#F4D363',
                    },
                    {
                      offset: 1,
                      color: '#1FD6DB',
                    },
                  ]),
                  stroke: 'rgba(3, 25, 63, .1)', //边框颜色
                },
              },
              {
                type: 'CubeTop',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: '#A58D3B',
                    },
                    {
                      offset: 1,
                      color: '#F4D363',
                    },
                  ]),
                  stroke: 'rgba(3, 25, 63, .1)', //边框颜色
                },
              },
            ],
          };
        },
        data: yData,
      },
      {
        name: '占比',
        type: 'line',
        showSymbol: true,
        // smooth: true,
        symbol: 'circle',
        symbolSize: 15,
        yAxisIndex: 1,
        itemStyle: {
          color: '#01EEFD',
        },
        lineStyle: {
          width: 3,
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(67, 239, 255, .3)',
              },
              {
                offset: 1,
                color: 'rgba(1, 17, 49, .3)',
              },
            ]),
          },
        },
        data: yData2,
      },
    ],
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  myChart.hideLoading();
};

const echartThreeInit = () => {
  //获取DOM元素并初始化
  let myChart = echarts.init(document.getElementById('echartsThree'), 'dark');
  myChart.showLoading();
  let data = [
    { code: '600519', stock: '南山区', fundPost: '21.987691' },
    { code: '000858', stock: '福田区', fundPost: '20.377176' },
    { code: '002475', stock: '宝安区', fundPost: '19.127404' },
    { code: '600276', stock: '龙华区', fundPost: '18.40882' },
    { code: '601318', stock: '罗湖区', fundPost: '17.980597' },
    { code: '000661', stock: '龙岗区', fundPost: '16.957898' },
    { code: '000333', stock: '松岗区', fundPost: '15.099577' },
    { code: '300760', stock: '盐田区', fundPost: '14.76103' },
    { code: '300750', stock: '坪山新区', fundPost: '13.002175' },
    { code: '601888', stock: '大鹏新区', fundPost: '12.133536' },
  ];
  function contains(arr: any, dst: any) {
    let i = arr.length;
    while ((i -= 1)) {
      if (arr[i] == dst) {
        return i;
      }
    }
    return false;
  }

  let attackSourcesColor = [
    new echarts.graphic.LinearGradient(0, 1, 1, 1, [
      { offset: 0, color: '#EB3B5A' },
      { offset: 1, color: '#FE9C5A' },
    ]),
    new echarts.graphic.LinearGradient(0, 1, 1, 1, [
      { offset: 0, color: '#FA8231' },
      { offset: 1, color: '#FFD14C' },
    ]),
    new echarts.graphic.LinearGradient(0, 1, 1, 1, [
      { offset: 0, color: '#F7B731' },
      { offset: 1, color: '#FFEE96' },
    ]),
    new echarts.graphic.LinearGradient(0, 1, 1, 1, [
      { offset: 0, color: '#395CFE' },
      { offset: 1, color: '#2EC7CF' },
    ]),
  ];
  let attackSourcesColor1 = [
    '#EB3B5A',
    '#FA8231',
    '#F7B731',
    '#3860FC',
    '#1089E7',
    '#F57474',
    '#56D0E3',
    '#1089E7',
    '#F57474',
    '#1089E7',
    '#F57474',
    '#F57474',
  ];
  let attaData = <any>[];
  let attaName = <any>[];
  let topName = <any>[];
  data.forEach((it, index) => {
    attaData[index] = parseFloat(it.fundPost).toFixed(2);
    attaName[index] = it.stock;
    topName[index] = `${it.code} ${it.stock}`;
  });
  let salvProMax = []; //背景按最大值
  for (let i = 0; i < attaData.length; i++) {
    salvProMax.push(attaData[0]);
  }
  function attackSourcesDataFmt(sData: any) {
    let sss = <any>[];
    sData.forEach(function (item: any, i: any) {
      let itemStyle = {
        color: i > 3 ? attackSourcesColor[3] : attackSourcesColor[i],
      };
      sss.push({
        value: item,
        itemStyle: itemStyle,
      });
    });
    return sss;
  }

  let option = {
    backgroundColor: 'rgba(0,0,0,0)',
    tooltip: {
      show: false,
      backgroundColor: 'rgba(3,169,244, 0.5)', //背景颜色（此时为默认色）
      textStyle: {
        fontSize: 20,
      },
    },
    color: ['#F7B731'],
    legend: {
      pageIconSize: [12, 12],
      top: '20',
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        //图例文字的样式
        fontSize: 17,
        color: '#fff',
      },
      selectedMode: false,
      data: ['个人所得(亿元)'],
    },
    grid: {
      left: '-15%',
      right: '0%',
      width: '100%',
      height: '100%',
      bottom: '0%',
      top: '12%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
    },
    yAxis: [
      {
        type: 'category',
        inverse: true,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisPointer: {
          label: {
            show: true,
            //margin: 30
          },
        },
        pdaaing: [5, 0, 0, 0],
        postion: 'right',
        data: attaName,
        axisLabel: {
          margin: 30,
          fontSize: 10,
          align: 'left',
          padding: [2, 0, 0, 0],
          color: '#000',
          rich: {
            nt1: {
              color: '#fff',
              backgroundColor: attackSourcesColor1[0],
              width: 17,
              height: 15,
              fontSize: 10,
              align: 'center',
              borderRadius: 100,
              padding: [3, 1, 1, 1],
            },
            nt2: {
              color: '#fff',
              backgroundColor: attackSourcesColor1[1],
              width: 17,
              height: 15,
              fontSize: 10,
              align: 'center',
              borderRadius: 100,
              padding: [3, 1, 1, 1],
            },
            nt3: {
              color: '#fff',
              backgroundColor: attackSourcesColor1[2],
              width: 17,
              height: 15,
              fontSize: 10,
              align: 'center',
              borderRadius: 100,
              padding: [3, 1, 1, 1],
            },
            nt: {
              color: '#fff',
              backgroundColor: attackSourcesColor1[3],
              width: 17,
              height: 15,
              fontSize: 10,
              align: 'center',
              borderRadius: 100,
              padding: [3, 1, 1, 1],
            },
          },
          formatter: function (value: any, index: any) {
            index = contains(attaName, value) + 1;
            if (index - 1 < 3) {
              return ['{nt' + index + '|' + index + '}'].join('\n');
            } else {
              return ['{nt|' + index + '}'].join('\n');
            }
          },
        },
      },
      {
        type: 'category',
        inverse: true,
        axisTick: 'none',
        axisLine: 'none',
        show: true,
        axisLabel: {
          textStyle: {
            color: '#fff',
            fontSize: '17',
          },
        },
        data: attackSourcesDataFmt(attaName),
      },
      {
        //名称
        type: 'category',
        offset: -10,
        position: 'left',
        axisLine: {
          show: false,
        },
        inverse: false,
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          color: ['#fff'],
          align: 'left',
          verticalAlign: 'bottom',
          lineHeight: 32,
          fontSize: 17,
        },
        data: topName,
      },
    ],
    series: [
      {
        zlevel: 1,
        name: '个人所得(亿元)',
        type: 'bar',
        barWidth: '15px',
        animationDuration: 1500,
        data: attackSourcesDataFmt(attaData),
        align: 'center',
        itemStyle: {
          normal: {
            barBorderRadius: 10,
          },
        },
        label: {
          show: true,
          fontSize: 10,
          color: '#fff',
          textBorderWidth: 2,
          padding: [2, 0, 0, 0],
        },
      },
      {
        name: '个人所得(亿元)',
        type: 'bar',
        barWidth: 15,
        barGap: '-100%',
        margin: '20',
        data: salvProMax,
        textStyle: {
          //图例文字的样式
          fontSize: 17,
          color: '#fff',
        },
        itemStyle: {
          normal: {
            color: '#05325F',
            //width:"100%",
            fontSize: 17,
            barBorderRadius: 30,
          },
        },
      },
    ],
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  myChart.hideLoading();
};

const echartsForeInit = () => {
  //获取DOM元素并初始化
  let myChart = echarts.init(document.getElementById('echartsFore'), 'dark');
  myChart.showLoading();
  let option = {
    backgroundColor: 'rgba(0,0,0,0)',
    normal: {
      top: 200,
      left: 300,
      width: 500,
      height: 400,
      zIndex: 6,
      backgroundColor: '',
    },
    color: ['rgba(245, 166, 35, 1)', 'rgba(19, 173, 255, 1)'],
    title: {
      show: true,
      text: '',
      left: '40%',
      top: '1%',
      textStyle: {
        fontSize: 18,
        color: '#fff',
        fontStyle: 'normal',
        fontWeight: 'normal',
      },
    },
    tooltip: {
      show: true,
      trigger: 'item',
    },
    legend: {
      show: true,
      icon: 'circle',
      left: '35%',
      top: '90%',
      orient: 'horizontal',
      textStyle: {
        fontSize: 14,
        color: '#fff',
      },
      data: ['高一(1)班', '高一(2)班'],
    },
    radar: {
      center: ['50%', '50%'],
      radius: '70%',
      startAngle: 90,
      splitNumber: 4,
      shape: 'circle',
      splitArea: {
        areaStyle: {
          color: ['transparent'],
        },
      },
      axisLabel: {
        show: false,
        fontSize: 18,
        color: '#fff',
        fontStyle: 'normal',
        fontWeight: 'normal',
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'white', //
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'white', //
        },
      },
      indicator: [
        {
          name: '语文',
          max: 150,
        },
        {
          name: '数学',
          max: 150,
        },
        {
          name: '英语',
          max: 150,
        },
        {
          name: '物理',
          max: 100,
        },
        {
          name: '生物',
          max: 100,
        },
        {
          name: '化学',
          max: 100,
        },
        {
          name: '政治',
          max: 100,
        },
        {
          name: '地理',
          max: 100,
        },
        {
          name: '历史',
          max: 100,
        },
      ],
    },
    series: [
      {
        name: '个人成绩',
        type: 'radar',
        symbol: 'circle',
        symbolSize: 10,
        areaStyle: {
          normal: {
            color: 'rgba(245, 166, 35, 0.4)',
          },
        },
        itemStyle: {
          color: 'rgba(245, 166, 35, 1)',
          borderColor: 'rgba(245, 166, 35, 0.3)',
          borderWidth: 10,
        },
        lineStyle: {
          normal: {
            type: 'dashed',

            color: 'rgba(245, 166, 35, 1)',
            width: 2,
          },
        },
        data: [[98, 109, 125, 92, 95, 94, 86, 81, 79]],
      },
      {
        name: '年级平均成绩',
        type: 'radar',
        symbol: 'circle',
        symbolSize: 10,
        itemStyle: {
          normal: {
            color: 'rgba(19, 173, 255, 1)',
            borderColor: 'rgba(19, 173, 255, 0.4)',
            borderWidth: 10,
          },
        },
        areaStyle: {
          normal: {
            color: 'rgba(19, 173, 255, 0.5)',
          },
        },
        lineStyle: {
          normal: {
            color: 'rgba(19, 173, 255, 1)',
            width: 2,
            type: 'dashed',
          },
        },
        data: [[111, 98, 117, 95, 91, 90, 92, 89, 91]],
      },
    ],
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  myChart.hideLoading();
};

const echartsFiveInit = () => {
  //获取DOM元素并初始化
  let myChart = echarts.init(document.getElementById('echartsFive'), 'dark');
  myChart.showLoading();
  // 随机生成x,y数据 S
  let base = +new Date(1968, 9, 3);
  let oneDay = 24 * 3600 * 1000;
  let date = [];
  let data = [Math.random() * 300];
  for (let i = 1; i < 8000; i++) {
    var now = new Date((base += oneDay));
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'));
    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
  }
  // 随机生成x,y数据 E
  let option = {
    backgroundColor: 'rgba(0,0,0,0)',
    color: ['#33E392'],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(13, 64, 71, 0.50)',
      borderColor: 'rgba(143, 225, 252, 0.60)',
      padding: 8,
      textStyle: {
        color: '#fff',
      },
    },
    // 区域缩放工具样式可用css样式修改
    // dataZoom: [
    //   {
    //     type: 'inside',
    //     start: 0,
    //     end: 10
    //   },
    //   {
    //     start: 0,
    //     end: 10
    //   }
    // ],
    legend: {
      data: ['计划完成比例'],
      icon: 'rect',
      itemWidth: 14,
      itemHeight: 14,
      top: 20,
      right: 15,
      textStyle: {
        fontSize: 14,
        color: '#737A85',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      axisLine: {
        // 轴线设置
        show: false, // 显示轴线
      },
      axisLabel: {
        textStyle: {
          color: '#737A85', //更改坐标轴文字颜色
          fontSize: 12, //更改坐标轴文字大小
        },
      },
      data: date,
    },
    yAxis: {
      splitLine: {
        show: true,
        lineStyle: {
          color: '#737A85',
          type: 'dashed',
        },
      },
      axisLabel: {
        textStyle: {
          color: '#737A85', //更改坐标轴文字颜色
          fontSize: 12, //更改坐标轴文字大小
        },
      },
    },
    series: [
      {
        name: '实际完成比例',
        type: 'line',
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'RGBA(51, 227, 146, 0.5)',
            },
            {
              offset: 1,
              color: 'RGBA(51, 227, 146, 0)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: data,
      },
    ],
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  myChart.hideLoading();
};

const echartsSixInit = () => {
  //获取DOM元素并初始化
  let myChart = echarts.init(document.getElementById('echartsSix'), 'dark');
  myChart.showLoading();
  let index = 0;
  let data = [
    [
      [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
      [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
    ],
    [
      [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
      [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34],
    ],
    [
      [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
      [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98],
    ],
    [
      [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
      [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24],
    ],
  ];

  setInterval(function () {
    //1.数组下标++ 切换数据
    index++;
    if (index > 3) {
      //数组最大下标为3,
      index = 0;
    }
    //2.替换数据
    option.series[0].data = data[index][0];
    option.series[1].data = data[index][1];
    //3.重新渲染 echarts图表
    myChart.setOption(option);
  }, 3000);

  let option = {
    backgroundColor: 'rgba(0,0,0,0)',
    title: {
      text: '单位:万',
      left: 30,
      // 文字颜色
      textStyle: {
        color: '#fff',
      },
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['预期销售额', '实际销售额'],
      left: 'right',
      textStyle: {
        color: '#fff',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      // 文字颜色
      axisLabel: {
        color: '#fff',
      },
      data: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
      ],
    },
    yAxis: {
      /* 刻度为数据最大刻度 */
      max: 'dataMax',
      type: 'value',
      // 文字颜色
      axisLabel: {
        color: '#fff',
      },
      //修改刻度颜色
      splitLine: {
        lineStyle: {
          color: '#fff',
        },
      },
    },
    series: [
      {
        name: '预期销售额',
        type: 'line',
        stack: '总量',
        //曲线
        smooth: true,
        //圆圈大小
        symbolSize: 8,
        itemStyle: {
          color: '#00f2f1', // 线颜色
        },
        data: data[0][0],
      },
      {
        name: '实际销售额',
        type: 'line',
        stack: '总量',
        //曲线
        smooth: true,
        //圆圈大小
        symbolSize: 8,
        data: data[0][1],
        itemStyle: {
          color: '#ed3f35', // 线颜色
        },
      },
    ],
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  myChart.hideLoading();
};

onMounted(() => {
  nextTick(() => {
    autofit.init({
      dh: 1080,
      dw: 1920,
      el: '#screen_box',
      resize: true,
      ignore: [
        {
          el: '', //传入ignore 以使元素不被缩放
        },
      ],
    });
    echartOneInit();
    echartTwoInit();
    echartThreeInit();
    echartsForeInit();
    echartsFiveInit();
    echartsSixInit();
  });
});

onBeforeUnmount(() => {
  // autofit.off()
});
</script>

<style lang="scss" scoped>
.screen_box {
  width: 100%;
  height: 100%;
  background: #101f30;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-top: 0;
  box-sizing: border-box;

  .layout_top {
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-top: 13px;

    .top_bg {
      width: 900px;
      height: 60px;
    }

    .title {
      position: absolute;
      font-size: 30px;
      top: -10px;
      color: #fff;
    }
  }

  .layout_content {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: nowrap;

    .box_content {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .content_left {
      width: 25%;
      align-items: center;

      .data_box {
        width: 100%;
        height: 340px;
        position: relative;
        display: flex;

        .data_box_title_box {
          width: 250px;
          height: 30px;
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          color: #fff;
          font-size: 20px;
        }

        .echartsOne {
          width: 500px;
          height: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
          margin-left: 30px;
        }

        .echartsThree {
          width: 500px;
          height: 500px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
        }
      }

      .data_box:last-child {
        height: 565px;
      }
    }

    .content_center {
      width: 50%;
      height: auto;
      padding: 0 20px;
      box-sizing: border-box;
      align-items: center;

      .content_center_top_box {
        width: 100%;
        height: 700px;
      }

      .content_center_bottom_box {
        width: 100%;
        height: 250px;

        .echartsTwo {
          width: 1000px;
          height: 250px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 30px;
        }
      }
    }

    .content_right {
      width: 25%;
      align-items: center;

      .data_box {
        width: 100%;
        height: 278px;
        position: relative;
        display: flex;

        .data_box_title_box {
          width: 250px;
          height: 30px;
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          color: #fff;
          font-size: 20px;
        }

        .echartsFore,
        .echartsFive,
        .echartsSix {
          width: 520px;
          height: 250px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 30px;
        }
      }
    }
  }
}
</style>
