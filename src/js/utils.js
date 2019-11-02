const setChartSize = (num) => {
    const w = $(`#chart${num}C`).width();
    const h = $(`#chart${num}C`).height();
    $(`#chart${num}`).css({
        width: w - 60 + 'px',
        height: h - 90 + 'px'
    });
}

const setSubChartSize = (num) => {
    const w = $(`.detail-content${num}`).eq(0).width();
    const h = $(`.detail-content${num}`).eq(0).height();
    $(`#detail${num}`).css({
        width: w - 100 + 'px',
        height: h - 100 + 'px',
        marginTop: 60 + 'px',
        marginLeft: 35 + 'px',
    });
}

const formatData = (theData) => {
    let data_in = theData.split("\n");
    data_in = data_in.map(function (val) {
        let temp = val.split(",");
        temp = temp.map(function (val) {
            return $.trim(val)
        })
        return temp;
    })
    data_in.splice(0, 1);
    data_in = data_in.filter(it => it.length > 1);
    return data_in;
}

const filterP1VINData = (allData, vin) => {
    return allData.filter(item => {
        return item[9] === vin;
    });
};

const filterP2VINData = (allData, vin) => {
    return allData.filter(item => {
        return item[4] === vin;
    });
};

const filterP3VINData = (allData, vin) => {
    return allData.filter(item => {
        return item[2] === vin;
    });
};

const filterP4VINData = (allData, vin) => {
    return allData.filter(item => {
        return item[3] === vin;
    });
};

const filterP5VINData = (allData, vin) => {
    return allData.filter(item => {
        return item[6] === vin;
    });
};

const filterP6VINData = (allData, vin) => {
    return allData.filter(item => {
        return item[5] === vin;
    });
};

export {
    setChartSize, formatData, setSubChartSize,
    filterP1VINData, filterP2VINData,
    filterP3VINData,
    filterP4VINData, filterP5VINData,
    filterP6VINData,
};