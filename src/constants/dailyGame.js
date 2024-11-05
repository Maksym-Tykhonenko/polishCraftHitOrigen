const dailyGame = [
    {
        day: '1',
        title: 'Kraków, 1364 – Casimir III the Great',
        situation: 'Coronation of King Casimir III the Great.',
        options: [
            {
                option: 'A: Support the king`s initiative.',
                result: 'Residents’ satisfaction increases by 100%. The community unites in celebration, fostering a sense of pride.',
                satisfaction: '+100'
            },
            {
                option: 'B: Express concerns.',
                result: 'Residents’ satisfaction decreases by 50%. People feel you do not support progress.',
                satisfaction: '-50'
            },
            {
                option: 'C: Leave the decision to the community.',
                result: 'Residents’ satisfaction remains neutral 0%. The community feels that not all opinions are considered.',
                satisfaction: '0'
            }
        ],
        image: require('../assets/back/krakow.jpeg.webp')
    },
    {
        day: '2',
        title: 'Warsaw, 1791 – Thaddeus Kosciuszko',
        situation: 'Discussion of the "Mazovian Constitution."',
        options: [
            {
                option: 'A: Express concerns.',
                result: 'Residents’ satisfaction decreases by 50%. Many people feel you do not believe in progress.',
                satisfaction: '-50'
            },
            {
                option: 'B: Support the constitution.',
                result: 'Residents’ satisfaction increases by 100%. People feel supported in change, leading to increased political activity.',
                satisfaction: '+100'
            },
            {
                option: 'C: Propose a compromise.',
                result: 'Residents’ satisfaction remains neutral 0%. People appreciate your approach but do not feel strong emotions.',
                satisfaction: '0'
            }
        ],
        image: require('../assets/back/warsaw.webp')
    },
    {
        day: '3',
        title: 'Gdańsk, 1945 – Lech Wałęsa',
        situation: 'Reconstruction of Gdańsk after the war.',
        options: [
            {
                option: 'A: Doubt the effectiveness of his actions.',
                result: 'Residents’ satisfaction decreases by 50%. People feel you do not support their aspirations.',
                satisfaction: '-50'
            },
            {
                option: 'B: Leave the situation unchanged.',
                result: 'Residents’ satisfaction remains neutral 0%. The community feels you are not showing initiative.',
                satisfaction: '0'
            },
            {
                option: 'C: Support Wałęsa`s initiatives.',
                result: 'Residents’ satisfaction increases by 100%. The community actively engages in reconstruction, fostering a sense of unity.',
                satisfaction: '+100'
            },

        ],
        image: require('../assets/back/gdansk.jpg')
    },
    {
        day: '4',
        title: 'Poznań, 1947 – Władysław Gomułka',
        situation: 'Debates about nationalization of industry.',
        options: [
            {
                option: 'A: Propose a mixed economy.',
                result: 'Residents’ satisfaction remains neutral 0%. The community does not feel a strong positive or negative impact.',
                satisfaction: '0'
            },
            {
                option: 'B: Support nationalization.',
                result: 'Residents’ satisfaction increases by 100%. People view this as a step towards economic recovery.',
                satisfaction: '+100'
            },
            {
                option: 'C: State that private ownership is important.',
                result: ' Residents’ satisfaction decreases by 50%. Many people feel you do not support their right to ownership.',
                satisfaction: '-50'
            }
        ],
        image: require('../assets/back/poznan.jpg')
    },
    {
        day: '5',
        title: 'Wrocław, 1968 – Władysław Simon',
        situation: 'Protests against political repression.',
        options: [
            {
                option: 'A: Support Szymon demands.',
                result: 'Residents’ satisfaction increases by 100%. People feel their voices are heard, leading to a rise in social movements.',
                satisfaction: '+100'
            },
            {
                option: 'B: Express concerns.',
                result: 'Residents’ satisfaction decreases by 50%. People feel you do not support their aspirations for freedom.',
                satisfaction: '-50'
            },
            {
                option: 'C: Try to negotiate with the authorities.',
                result: 'Residents’ satisfaction remains neutral 0%. Your approach is seen as an attempt to resolve the conflict but does not evoke strong emotions.',
                satisfaction: '0'
            }
        ],
        image: require('../assets/back/wroclaw.jpeg')
    },
    {
        day: '6',
        title: 'Lublin, 1980 – Lech Walesa',
        situation: 'Strikes at the factory led by Lech Wałęsa.',
        options: [
            {
                option: 'A: State that the strike may harm the economy.',
                result: 'Residents’ satisfaction decreases by 50%. Many people feel you do not support their aspirations.',
                satisfaction: '-50'
            },
            {
                option: 'B: Propose peaceful negotiations.',
                result: 'Residents’ satisfaction remains neutral 0%. People see you as trying to be objective but do not feel a strong positive impact.',
                satisfaction: '0'
            },
            {
                option: 'C: Support the strike.',
                result: 'Residents’ satisfaction increases by 100%. People feel their aspirations for change are recognized.',
                satisfaction: '+100'
            }
        ],
        image: require('../assets/back/lublin.jpg')
    },
    {
        day: '7',
        title: 'Katowice, 2010 – Jarosław Kaczyński',
        situation: 'Conference discussing environmental issues.',
        options: [
            {
                option: 'A: Propose a balanced approach.',
                result: 'Residents’ satisfaction remains neutral 0%. People appreciate your pragmatic approach but do not feel strong emotions.',
                satisfaction: '0'
            },
            {
                option: 'B: Support environmental initiatives.',
                result: 'Residents’ satisfaction increases by 100%. People feel you care about their health and the environment.',
                satisfaction: '+100'
            },
            {
                option: 'C: Express disagreement with environmental regulations.',
                result: 'Residents’ satisfaction decreases by 50%. People feel you do not support their right to clean air.',
                satisfaction: '-50'
            }
        ],
        image: require('../assets/back/katowice.jpg')
    }
];

export default dailyGame;