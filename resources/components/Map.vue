<template>
  <div id="map-homepage" class="map" style="width:100%;height:100%;"></div>
</template>
<script>
import { L } from 'vue2-leaflet'
import * as d3 from 'd3'
import * as turf from '@turf/turf'
import 'leaflet/dist/leaflet.css'

export default {
    name: 'MapL2d',
    props: {
        gpx_file: {
            type: String,
            default: '/gpx/route1.gpx'
        },
        sidebar_selected_index: {
            type: Number,
            default: -1
        }
    },
    mounted() {
        //console.debug('mount map ')
        let config = this.$_config
        let margin = this.$_margin

        let map = L.map('map-homepage', {
            dragging: true,
            zoomControl: true,
            minZoom: 5,
            maxZoom: 20
        }).setView([39.74739, -105], 13)
        //
        // // add carto light basemap tiles
        let mapBox = L.tileLayer(
            'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
            {
                maxZoom: 18,
                id: 'mapbox.light'
            }
        )

        map.addLayer(mapBox)
        this.$_courseMap = map

        this.$_width = window.innerWidth - margin.left - margin.right
        this.$_height = 200 - margin.top - margin.bottom

        let parseDate = d3.bisector(function(d) {
            return d.path
        }).left
        let bisecDate = parseDate
        let formatValue = d3.format(',.2f')
        let formatCurrency = function(d) {
            return '$' + formatValue(d)
        }

        this.$_x = d3.scaleLinear().range([0, this.$_width])
        this.$_y = d3.scaleLinear().range([this.$_height, 0])

        let xAxis = d3.axisBottom().scale(this.$_x)
        let yAxis = d3.axisLeft().scale(this.$_y)
        this.$_xAxis = xAxis
        this.$_yAxis = yAxis

        // define the area for fill
        let area = d3
            .area()
            .x(function(d) {
                return this.$_x(d.path)
            })
            .y0(this.$_height)
            .y1(function(d) {
                return this.$_y(d.alt)
            })
            .curve(d3.curveMonotoneX)
        this.$_area = area

        let line = d3
            .line()
            .x(function(d) {
                return this.$_x(d.path)
            })
            .y(function(d) {
                return this.$_y(d.alt)
            })
            .curve(d3.curveMonotoneX)
        this.$_line = line

        //var files = ["data1.json", "data2.json", "data3.json"];

        //this.createCircleMarker({}, [50, 30])

        console.debug(`GPX_FILE - ${this.gpx_file}`)

        Promise.all([d3.json('/routes.json'), d3.xml(this.gpx_file)]).then(
            values => {
                let json = values[0]
                let gpx = values[1]

                this.$_data = [].map.call(
                    gpx.querySelectorAll('trkpt'),
                    function(tag) {
                        return {
                            lat: +tag.getAttribute('lat'),
                            lon: +tag.getAttribute('lon'),
                            alt: +tag.querySelector('ele').textContent
                        }
                    }
                )

                this.$_poiDataGlobal = json
                this.drawGeojson(this.$_data)
                // drawGeojsonSmall(data)
                this.d3Chart()
                this.displayInfo(json)
            }
        )
    },
    created() {
        this.$_courseMap = ''
        this.$_currentPositionMarker = ''
        this.$_poiDataGlobal = ''
        this.$_data = ''
        this.$_focus = ''
        this.$_svg = ''
        this.$_height = ''
        this.$_width = ''
        this.$_xAxis = ''
        this.$_yAxis = ''
        this.$_area = ''
        this.$_line = ''
        this.$_x = ''
        this.$_y = ''
        this.$_margin = {
            top: 20,
            right: 50,
            bottom: 30,
            left: 50
        }
        this.$_config = {
            id: '1', // the tour id
            post_id: '200', // wordpress post id (just in case if we need it)
            start: 1, // the id of the starting poi in data.json
            end: 1, // start and end are the same so just show 1 icon
            pois: {
                'small-map': [
                    {
                        id: 2 // we want only show id 2 point in the small map
                    },
                    {
                        id: 1 // we want only show id 2 point in the small map
                    }
                ],
                'full-map': [
                    {
                        id: 1
                    },
                    {
                        id: 2
                    },
                    {
                        id: 3
                    },
                    {
                        id: 4
                    },
                    {
                        id: 5
                    },
                    {
                        id: 6
                    },
                    {
                        id: 7
                    },
                    {
                        id: 8
                    },
                    {
                        id: 9
                    },
                    {
                        id: 10
                    },
                    { id: 11 }
                ]
            }, // the id's of the data.json which defines which points should be shown
            type: 'street',
            'alternative-routes': true // tour 1 and tour 2 are connected
        }
    },
    methods: {
        drawGeojson(data) {
            var boundsArray = []
            this.$_path = data.map(function(item) {
                boundsArray.push([item.lat, item.lon])
                return [item.lon, item.lat]
            })
            let geoLine = turf.lineString(this.$_path, {
                name: 'path'
            })

            let geojson = L.geoJson(geoLine, {
                style: function(feature) {
                    return {
                        weight: 5,
                        opacity: 0.8,
                        color: '#333',
                        dashArray: '3',
                        stroke: true
                    }
                },
                onEachFeature: (feature, layer) => {
                    layer.on({
                        mousemove: this.findNearestPoint.bind(this.$_path),
                        mouseover: this.findNearestPoint.bind(this.$_path),
                        mouseout: function(e) {
                            geojson.resetStyle(e.target)
                            //info.update();
                        },
                        click: e => {
                            this.$_courseMap.fitBounds(e.target.getBounds())
                        }
                    })
                }
            })

            geojson.addTo(this.$_courseMap)
            geojson.bringToFront()

            this.$_courseMap.fitBounds(boundsArray, {
                padding: [50, 50]
            })
        },
        findNearestPoint(e) {
            // console.log('', e.latlng);
            let targetPoint = turf.point([e.latlng.lng, e.latlng.lat])
            let points = turf.featureCollection(
                this.$_path.map(function(item, key) {
                    return turf.point(item, {
                        id: key
                    })
                })
            )
            let nearest = turf.nearestPoint(targetPoint, points)
            // console.log('', nearest);
            this.displayDots(this.$_focus, this.$_data, nearest.properties.id) // d3js
        },
        findNearestPointD3(coords, path) {
            let targetPoint = turf.point([coords.lng, coords.lat])
            let points = turf.featureCollection(
                path.map(function(item, key) {
                    return turf.point(item, {
                        id: key
                    })
                })
            )
            let nearest = turf.nearestPoint(targetPoint, points).geometry
                .coordinates
            let index = -1
            for (var i = 0; i < path.length; i++) {
                if (path[i][0] === nearest[0] && path[i][1] === nearest[1]) {
                    index = i
                    break
                }
            }
            return index
        },
        scrollTo(id) {
            //$("#infoPannel").scrollTo($("#poi_" + id), 800);
            //$(".intamap-info").css('background-color', 'transparent');
            //$("#poi_" + id).css('background-color', '#eee')
        },
        createCircleMarker(feature, latlng) {
            // Change the values of these options to change the symbol's appearance
            let options = {
                radius: 8,
                fillColor: 'blue',
                color: 'black',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8,
                smoothFactor: 3
            }
            this.$_currentPositionMarker = L.circleMarker(
                latlng,
                options
            ).addTo(this.$_courseMap)
        },
        displayInfo(json) {
            /*==============NEW===============*/
            let filteredPoi = []
            let config = this.$_config

            if (typeof config.pois['full-map'] !== 'undefined') {
                config.pois['full-map'].forEach(item => {
                    var id = item.id
                    this.$_poiDataGlobal.forEach(function(i) {
                        if (+i.id === +id) filteredPoi.push(i)
                    })
                })
            }
            /*==============NEW===============*/

            console.debug('filtered poi')
            console.debug('', filteredPoi)
            console.debug(this.$_focus)

            var text = ''
            filteredPoi.map((item, key) => {
                let greenIcon = L.icon({
                    iconUrl: item.category.iconMapUrl,
                    iconSize: [40, 40], // size of the icon
                    //shadowSize: [50, 64], // size of the shadow
                    iconAnchor: [10, 28], // point of the icon which will correspond to marker's location
                    //shadowAnchor: [4, 62], // the same for the shadow
                    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                })
                let coord = item.geometry.split(',')

                let marker = L.marker([coord[1], coord[0]], {
                    icon: greenIcon,
                    id: key
                }).addTo(this.$_courseMap)

                marker.on('mouseover', function(e) {
                    var id = marker.options.id
                    scrollTo(id)
                })

                var img = ''
                if (item.hasOwnProperty('primaryImage')) {
                    img =
                        '<img style="width:100%" src="/app/uploads/intamap/' +
                        item.primaryImage.url +
                        '">'
                }
                text +=
                    '<div class="intamap-info" id="poi_' +
                    key +
                    '">' +
                    img +
                    '<h5>' +
                    item.title +
                    '</h5><p>' +
                    item.longText +
                    '</p></div>'

                //update d3 chart
                let index = this.findNearestPointD3(
                    {
                        lng: +coord[0],
                        lat: +coord[1]
                    },
                    this.$_path
                )

                this.displayPOIatIndex(
                    this.$_focus,
                    this.$_data,
                    index,
                    item.category.iconMapUrl,
                    key
                )
            })

            // info.innerHTML =
            //     "<a class='infobar_caption' data-target='#collapseTour' data-toggle='collapse' href='#collapseTour' aria-expanded='true' aria-controls='collapseTour'>Tour Infos</a>" +
            //     "<div class='collapse show' id='collapseTour'>" +
            //     text +
            //     '</div>'
        },
        displayDots(focus, data, index) {
            //console.log(index);
            var format = d3.format(',.0f')
            var d = data[index]
            focus.style('display', null)
            focus.attr(
                'transform',
                'translate(' + x(d.path) + ',' + y(d.alt) + ')'
            )
            focus.select('text').text('Höhenmeter: ' + format(d.alt))
        },
        displayPOIatIndex(focus, data, index, img, id) {
            var format = d3.format(',.0f')
            var d = data[index]

            focus.style('display', null)
            focus.attr(
                'transform',
                'translate(' + this.$_x(d.path) + ',' + this.$_y(d.alt) + ')'
            )
            focus.select('text').text('Höhenmeter: ' + format(d.alt))

            //console.log('', y(d.alt));

            // this.$_svg.append('line')
            //     .attr('x1', this.$_x(d.path))
            //     .attr(
            //         'y1',
            //         d3
            //             .select('.y')
            //             .node()
            //             .getBoundingClientRect().height / 2
            //     )
            //     .attr('x2', this.$_x(d.path))
            //     .attr(
            //         'y2',
            //         d3
            //             .select('.y')
            //             .node()
            //             .getBoundingClientRect().height
            //     )
            //     .style('stroke', 'black')
            //
            // this.$_svg.append('line')
            //     .attr('x1', this.$_x(d.path))
            //     .attr(
            //         'y1',
            //         d3
            //             .select('.y')
            //             .node()
            //             .getBoundingClientRect().height / 2
            //     )
            //     .attr('x2', this.$_x(d.path))
            //     .attr(
            //         'y2',
            //         d3
            //             .select('.y')
            //             .node()
            //             .getBoundingClientRect().height
            //     )
            //     .style('stroke', '#eee')
            //     .attr('stroke-width', 10)
            //     .style('stroke-opacity', 0.1)
            //     .on('mouseover', function() {
            //         focus.style('display', null)
            //         focus.attr(
            //             'transform',
            //             'translate(' + this.$_x(d.path) + ',' + this.$_y(d.alt) + ')'
            //         )
            //         focus.select('text').text('Höhenmeter: ' + format(d.alt))
            //         scrollTo(id)
            //     })
            //     .on('mouseout', function() {})

            // this.$_svg.append('svg:image')
            //     .attr('x', this.$_x(d.path) - 15)
            //     .attr(
            //         'y',
            //         d3
            //             .select('.y')
            //             .node()
            //             .getBoundingClientRect().height /
            //             2 -
            //             30
            //     )
            //     .attr('width', 30)
            //     .attr('height', 30)
            //     .attr('xlink:href', img)
            //     .on('mouseover', function() {
            //         d3.select(this).style('cursor', 'pointer')
            //         scrollTo(id)
            //     })
            //     .on('mouseout', function() {})
        },
        d3Chart() {
            var modal = document.querySelector('#modal')
            // console.log('', modal, modal.offsetWidth);

            /* Calculate distance */
            //let greatArc = d3.geoDistance()
            let prevData
            let dist = 0
            let data = this.$_data
            let margin = this.$_margin
            let xAxis = this.$_xAxis
            let yAxis = this.$_yAxis
            let area = this.$_area
            let line = this.$_line

            this.$_svg = d3
                .select('#chart')
                .append('svg')
                .attr('width', this.$_width + margin.left + margin.right)
                .attr('height', this.$_height + margin.top + margin.bottom)
                .append('g')
                .attr(
                    'transform',
                    'translate(' + margin.left + ',' + margin.top + ')'
                )

            // data.forEach(function(val, key) {
            //     if (prevData === undefined) {
            //         prevData = val
            //         console.log(1)
            //     }
            //     dist +=
            //         greatArc.distance({
            //             source: [
            //                 prevData.lat.toFixed(5),
            //                 prevData.lon.toFixed(5)
            //             ],
            //             target: [val.lat.toFixed(5), val.lon.toFixed(5)]
            //         }) * 6371
            //     data[key].path = dist
            //     prevData = val
            // })

            //console.log(data);
            data.forEach(function(d) {
                d.path = +d.path
                d.alt = +d.alt
            })

            data.sort(function(a, b) {
                return a.path - b.path
            })

            // x.domain([data[0].path, data[data.length - 1].path])
            // y.domain(
            //     d3.extent(data, function(d) {
            //         return d.alt
            //     })
            // )

            this.$_svg
                .append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + this.$_height + ')')
                .call(xAxis)

            this.$_svg
                .append('text')
                .attr('text-anchor', 'middle') // this makes it easy to centre the text as the transform is applied to the anchor
                .attr(
                    'transform',
                    'translate(' +
                        this.$_width / 2 +
                        ',' +
                        (this.$_height + 26) +
                        ')'
                ) // centre below axis
                .text('Entfernung (km)')

            this.$_svg
                .append('g')
                .attr('class', 'y axis')
                .call(yAxis)
                .append('text')
                .attr('transform', 'rotate(-90)')
                .attr('y', 6)
                .attr('dy', '.71em')
                .style('text-anchor', 'end')
                .text('Höhenmeter (m)')

            this.$_svg
                .append('path')
                .data([data])
                .attr('class', 'area')
                .attr('d', area)

            this.$_svg
                .append('path')
                .datum(data)
                .attr('class', 'line')
                .attr('d', line)
                .style('stroke', '#993300')

            this.$_focus = this.$_svg
                .append('g')
                .attr('class', 'focus')
                .style('display', 'none')

            this.$_focus.append('circle').attr('r', 4)

            this.$_focus
                .append('text')
                .style('font-size', '14px')
                .attr('y', -15)
                .attr('dy', '.35em')

            this.$_svg
                .append('rect')
                .attr('class', 'overlay')
                .attr('width', this.$_width)
                .attr('height', this.$_height)
                .on('mouseover', function() {
                    focus.style('display', null)
                })
                .on('mouseout', () => {
                    focus.style('display', 'none')
                    this.$_currentPositionMarker.setLatLng([-1000, -1000])
                })
                .on('mousemove', () => {
                    var format = d3.format(',.0f')
                    var x0 = this.$_x.invert(d3.mouse(this)[0]),
                        i = bisectDate(data, x0, 1),
                        d0 = data[i - 1],
                        d1 = data[i],
                        d = x0 - d0.path > d1.path - x0 ? d1 : d0

                    this.$_focus.attr(
                        'transform',
                        'translate(' +
                            this.$_x(d.path) +
                            ',' +
                            this.$_y(d.alt) +
                            ')'
                    )
                    this.$_focus
                        .select('text')
                        .text('Höhenmeter: ' + format(d.alt))

                    //console.log('',x(d.path), d1);

                    this.$_currentPositionMarker.setLatLng([d1.lat, d1.lon])
                    this.$_currentPositionMarker.bringToFront()
                })
        },
        mouseOver: function() {
            this.$_focus.style('display', null)
        },
        mouseOut: function() {
            this.$_focus.style('display', 'none')
        },
        mouseMove: function() {
            var format = d3.format(',.0f')
            var x0 = this.$_x.invert(d3.mouse(this)[0]),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.path > d1.path - x0 ? d1 : d0

            this.$_focus.attr(
                'transform',
                'translate(' + this.$_x(d.path) + ',' + this.$_y(d.alt) + ')'
            )
            this.$_focus.select('text').text('Höhenmeter: ' + format(d.alt))

            //console.log('',x(d.path), d1);

            this.$_currentPositionMarker.setLatLng([d1.lat, d1.lon])
            this.$_currentPositionMarker.bringToFront()
        }
    }
}
</script>
<style>

.leaflet-marker-icon {
    /*animation-name: bounce-inf;*/
    /*animation-fill-mode: both;*/
    /*animation-duration: 1s;*/
    /*animation-iteration-count: infinite;*/
}

.pin {
    width: 30px;
    height: 30px;
    border-radius: 50% 50% 50% 0;
    background: #89849b;
    position: absolute;
    transform: rotate(-45deg);
    left: 50%;
    top: 50%;
    margin: -20px 0 0 -20px;
    animation-name: bounce;
    animation-fill-mode: both;
    animation-duration: 1s;
}
.pin:after {
    content: '';
    width: 14px;
    height: 14px;
    margin: 8px 0 0 8px;
    background: #2f2f2f;
    position: absolute;
    border-radius: 50%;
}
.pulse {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    height: 14px;
    width: 14px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: 11px 0px 0px -12px;
    transform: rotateX(55deg);
    z-index: -2;
}
.pulse:after {
    content: '';
    border-radius: 50%;
    height: 40px;
    width: 40px;
    position: absolute;
    margin: -13px 0 0 -13px;
    animation: pulsate 1s ease-out;
    animation-iteration-count: infinite;
    opacity: 0;
    box-shadow: 0 0 1px 2px #89849b;
    animation-delay: 1.1s;
}
@keyframes bounce-inf {
    0% {
        transform: translateY(0px);
    }
    40% {
        transform: translateY(30px);
    }
    60% {
        transform: translateY(0px);
    }
    80% {
        transform: translateY(30px);
    }
    100% {
        transform: translateY(0px);
    }
}
@-moz-keyframes pulsate {
    0% {
        transform: scale(0.1, 0.1);
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        transform: scale(1.2, 1.2);
        opacity: 0;
    }
}
@-webkit-keyframes pulsate {
    0% {
        transform: scale(0.1, 0.1);
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        transform: scale(1.2, 1.2);
        opacity: 0;
    }
}
@-o-keyframes pulsate {
    0% {
        transform: scale(0.1, 0.1);
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        transform: scale(1.2, 1.2);
        opacity: 0;
    }
}
@keyframes pulsate {
    0% {
        transform: scale(0.1, 0.1);
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        transform: scale(1.2, 1.2);
        opacity: 0;
    }
}

@keyframes bounce {
    0% {
        opacity: 0;
        transform: translateY(-2000px) rotate(-45deg);
    }
    60% {
        opacity: 1;
        transform: translateY(30px) rotate(-45deg);
    }
    80% {
        transform: translateY(-10px) rotate(-45deg);
    }
    100% {
        transform: translateY(0) rotate(-45deg);
    }
}
</style>
