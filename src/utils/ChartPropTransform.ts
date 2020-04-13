type Card = {
    id: string;
    species: string;
    piece: number;
    date_planted: Date;
    picture: string;
};

type Seeds = {
    id: number;
    species: string;
    piece: number;
    date: Date;
  };

type ChartData = {
    labels: String[];
    datasets: [{
        data: Number[];
        backgroundColor: String[];
        borderColor: String[];
        borderWidth: Number;
        hoverBorderColor: String[];
        hoverBackgroundColor: String[];
    }];
};

const chartPropsTransform = (inputData: Card[] | Seeds[]) => {
    let chartData: ChartData = { labels: [], datasets: [{ data: [], backgroundColor: [], borderColor: [], borderWidth: 4, hoverBorderColor: [], hoverBackgroundColor: [] }] };
    inputData.forEach((data: any) => {
        chartData.labels.push(data.species);
        chartData.datasets[0].data.push(data.piece);
        const color = generateRandomColor();
        chartData.datasets[0].backgroundColor.push(color);
        chartData.datasets[0].borderColor.push(color);
        chartData.datasets[0].hoverBorderColor.push('#757575');
        chartData.datasets[0].hoverBackgroundColor.push(color);
    });
    return chartData;
};

const generateRandomColor = (): string => {
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return color;
}

export default chartPropsTransform;