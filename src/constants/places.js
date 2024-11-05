const places = [
    {
        city: 'Krakow',
        image: require('../assets/places/krakow.jpg'),
        description: 'Kraków is one of the oldest and most beautiful cities in Poland, located on the banks of the Vistula River. It served as the capital of Poland until 1596 and remains the cultural and scientific capital of the country.',
        attractions: [
            {
                name: 'Wawel Castle',
                description: 'This castle impresses with its architecture and history. It features royal apartments, the Chapel of St. Stanislaus, and the famous Wawel Dragon, whose legend is tied to the city`s history.'
            },
            {
                name: 'Old Town',
                description: 'Kraków`s Old Town is a UNESCO World Heritage Site. The market square is the largest medieval square in Europe, filled with numerous cafes, shops, and landmarks, including the Cloth Hall.'
            },
            {
                name: 'Kazimierz',
                description: 'This district is known as the Jewish Quarter, with deep historical roots. It is home to synagogues, Jewish museums, and many restaurants serving traditional Jewish cuisine.'
            },
            {
                name: 'Culture',
                description: 'Kraków hosts numerous festivals, including the Kraków International Documentary Film Festival and the Night of Museums, where museums are open for free visits at night.'
            }
        ],
        coordinates: [
            { lat: 50.0619474, lng: 19.9368564 },
        ]
    },
    {
        city: 'Warsaw',
        image: require('../assets/places/warsaw.jpg'),
        description: 'Warsaw, the capital of Poland, is a city rich in history and impressive architectural heritage that combines ancient and modern elements.',
        attractions: [
            {
                name: 'Old Town',
                description: 'Reconstructed after World War II, it is a UNESCO World Heritage Site. Here you can find the Royal Castle, which serves as a museum, and numerous cafes and shops.'
            },
            {
                name: 'Warsaw Uprising Museum',
                description: 'This is one of the most important museums in Poland, dedicated to the 1944 uprising. It features numerous exhibits, video materials, and interactive displays.'
            },
            {
                name: 'Palace of Culture and Science',
                description: 'Built in a Soviet style, this monumental building is one of the symbols of Warsaw and has an observation deck on the 30th floor offering panoramic views of the city.'
            },
            {
                name: 'Culture',
                description: 'Warsaw is an active cultural center with numerous theaters, museums, and concert halls. Major festivals, such as the Warsaw Jazz Festival, are held annually.'
            }
        ],
        coordinates: [
            { lat: 52.2319581, lng: 21.0067249},
        ]
    },
    {
        city: 'Wroclaw',
        image: require('../assets/places/wroclaw.jpg'),
        description: 'Wrocław, located in western Poland, is known for its diverse architecture, bridges, and islands on the Oder River.',
        attractions: [
            {
                name: 'Old Town',
                description: 'The Market Square features colorful buildings and the Old Town Hall, built in Gothic style, serving as the heart of the city`s life.'
            },
            {
                name: 'Ostrów Tumski',
                description: 'This is the oldest part of Wrocław, where you can see the Cathedral of St. John the Baptist and enjoy views of the river.'
            },
            {
                name: 'Wrocław Gnomes',
                description: 'About 400 small gnome statues scattered throughout the city have become popular attractions for tourists.'
            },
            {
                name: 'Culture',
                description: 'The city hosts numerous festivals, including the Wrocław Theatre Festival, attracting actors and performers from around the world.'
            }
        ],
        coordinates: [
            { lat: 51.1089776, lng: 17.0326689},
        ]
    },
    {
        city: 'Gdansk',
        image: require('../assets/places/gdansk.jpg'),
        description: 'Gdańsk is one of Poland`s largest port cities, located on the Baltic Sea coast. It is renowned for its history related to maritime trade.',
        attractions: [
            {
                name: 'Old Town',
                description: 'Featuring beautiful Gothic and Renaissance buildings like the Golden Gate and St. Mary`s Church, one of the largest brick churches in the world.'
            },
            {
                name: 'Museum of the Second World War',
                description: 'This museum provides a detailed overview of the events of World War II, focusing on its impact on Poland and the world.'
            },
            {
                name: 'Granary',
                description: 'An architectural gem reflecting Gdańsk`s wealth as a port city, now used for cultural events.'
            },
            {
                name: 'Culture',
                description: 'Gdańsk actively hosts cultural events, including art exhibitions and concerts. The city is also known for its gastronomic traditions.'
            }
        ],
        coordinates: [
            { lat: 54.3706858, lng: 18.6129821},
        ]
    },
    {
        city: 'Zakopane',
        image: require('../assets/places/zakopane.jpg'),
        description: 'Zakopane, located in the Tatra Mountains, is a popular resort city, especially in winter. It is famous for its skiing and picturesque landscapes.',
        attractions: [
            {
                name: 'Tatra Mountains',
                description: 'Beautiful mountainous scenery with numerous hiking trails and skiing opportunities.'
            },
            {
                name: 'Wooden Churches',
                description: 'Unique architecture that is part of UNESCO heritage, including the Church of St. Alexander.'
            },
            {
                name: 'Spa in Zakopane',
                description: 'A traditional Polish spa with healing waters offering relaxation and wellness.'
            },
            {
                name: 'Culture',
                description: 'Zakopane is known for its highlander culture. Visitors can taste traditional dishes such as "oscypek" (smoked sheep cheese) and enjoy folk music.'
            }
        ],
        coordinates: [
            { lat: 49.2969114, lng: 19.9504753},
        ]
    },
    {
        city: 'Poznan',
        image: require('../assets/places/poznan.jpg'),
        description: 'Poznań is one of Poland`s oldest cities, located in the western part of the country. It has a rich cultural heritage and played a significant role in Poland`s history.',
        attractions: [
            {
                name: 'Old Town',
                description: 'he square features colorful buildings and the beautiful Town Hall, where a daily performance of two goats "butting" occurs at noon.'
            },
            {
                name: 'Cathedral Island',
                description: 'One of the oldest in Poland, it contains many historical artifacts and the tombs of Polish kings.'
            },
            {
                name: 'Archaeological Museum',
                description: 'One of the largest museums in Poland, housing a collection of artifacts from various historical periods.'
            },
            {
                name: 'Culture',
                description: 'Poznań is an important cultural center that frequently hosts festivals, such as the Poznań Malta Festival, attracting theater and music performers from around the world.'
            }
        ],
        coordinates: [
            { lat: 52.4082663, lng: 16.9335199},
        ]
    },
    {
        city: 'Torun',
        image: require('../assets/places/torun.jpg'),
        description: 'Toruń is the birthplace of Nicolaus Copernicus and is known for its medieval architectural heritage.',
        attractions: [
            {
                name: 'Medieval Town',
                description: 'A UNESCO World Heritage Site with architectural gems such as the Cathedral of St. John and the Palace of the Teutonic Knights.'
            },
            {
                name: 'Copernicus Museum',
                description: 'Dedicated to the life and scientific achievements of the great astronomer, located in his birthplace.'
            },
            {
                name: 'Gothic Churches',
                description: 'Many historic churches housing important artifacts and icons.'
            },
            {
                name: 'Culture',
                description: 'Toruń is famous for its gingerbread, and the city hosts festivals related to this delicacy. It also actively develops cultural initiatives.'
            }
        ],
        coordinates: [
            { lat: 53.0102721, lng: 18.6048094},
        ]
    },
    {
        city: 'Lodz',
        image: require('../assets/places/lodz.jpg'),
        description: 'Łódź was once an important center for the textile industry and is now transforming into a cultural hub with a rich history.',
        attractions: [
            {
                name: 'Piotrkowska Street',
                description: 'A famous shopping street with numerous shops, restaurants, and cultural establishments.'
            },
            {
                name: 'Textile Museum',
                description: 'Located in an old factory, the museum showcases the history of the textile industry and production in Poland.'
            },
            {
                name: 'Scheibler`s Factory',
                description: 'A wonderful example of industrial architecture, now transformed into a cultural center.'
            },
            {
                name: 'Culture',
                description: 'Łódź hosts many festivals, such as the Four Cultures Festival, which unites different national traditions.'
            }
        ],
        coordinates: [
            { lat: 51.7687323, lng: 19.4569911},
        ]
    },
    {
        city: 'Sopot',
        image: require('../assets/places/sopot.jpg'),
        description: 'Sopot is a popular resort on the Baltic Sea coast, known for its beaches and promenades.',
        attractions: [
            {
                name: 'Sopot Pier',
                description: 'One of the longest wooden piers in Europe, where visitors can stroll and enjoy views of the sea.'
            },
            {
                name: 'Sopot Lighthouse',
                description: 'A historic lighthouse that has become a symbol of the city, offering panoramic views of the surroundings.'
            },
            {
                name: 'Spa Villas',
                description: 'Architectural gems built in the Art Deco style that add charm to the city.'
            },
            {
                name: 'Culture',
                description: 'Sopot is known for hosting music festivals, such as the Sopot Festival, which attracts popular artists.'
            }
        ],
        coordinates: [
            { lat: 54.4447922, lng: 18.5684902},
        ]
    },
    {
        city: 'Katowice',
        image: require('../assets/places/katowice.jpeg'),
        description: 'Katowice is a modern city known for its industrial heritage as well as cultural initiatives.',
        attractions: [
            {
                name: 'Silesian Museum',
                description: 'Located in a former coal mine, the museum offers insights into the region`s history through art and culture.'
            },
            {
                name: '"New Name" Concert Hall',
                description: 'Known for its modern architecture, it hosts classical and contemporary music concerts.'
            },
            {
                name: 'Katowice Park',
                description: 'A spacious park ideal for relaxation, walks, and cultural events.'
            },
            {
                name: 'Culture',
                description: 'The city is rapidly developing and hosts various cultural events, contemporary art festivals, and music events.'
            }
        ],
        coordinates: [
            { lat: 50.2598987, lng: 19.0215852},
        ]
    }
];

export default places;