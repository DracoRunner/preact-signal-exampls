"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigurationByIndex = void 0;
var configuration = [
    {
        title: 'Just Landed',
        model: 'showMovieHybrid',
        carouselPresentationStyle: 'default',
        carouselId: '9571f627-d865-4fd7-8385-998625d39c3c',
    },
    {
        title: 'Sports',
        model: 'showMovieHybrid',
        carouselPresentationStyle: 'default',
        carouselId: '96448056-16d6-46e4-8323-014a1d0d720f',
    },
    {
        title: 'Paramount+ Originals and Exclusives',
        model: 'showMovieHybrid',
        carouselPresentationStyle: 'default',
        carouselId: '19589685-2d31-4d8a-8f0b-bed1024077fd',
    },
    {
        title: 'Picks Of The Week',
        model: 'showMovieHybrid',
        carouselPresentationStyle: 'default',
        carouselId: '3f6c187d-9241-4596-a689-c245ca6642c6',
    },
    {
        title: 'Multi Region Test: Movies',
        model: 'showMovieHybrid',
        carouselPresentationStyle: 'default',
        carouselId: '7099976a-7ec3-4e5c-b0f9-b81968bb7210',
    },
    {
        title: 'Just Landed',
        model: 'showMovieHybrid',
        carouselPresentationStyle: 'default',
        carouselId: '9571f627-d865-4fd7-8385-998625d39c3c',
    },
    {
        title: 'Sports',
        model: 'showMovieHybrid',
        carouselPresentationStyle: 'default',
        carouselId: '96448056-16d6-46e4-8323-014a1d0d720f',
    },
    {
        title: 'Paramount+ Originals and Exclusives',
        model: 'showMovieHybrid',
        carouselPresentationStyle: 'default',
        carouselId: '19589685-2d31-4d8a-8f0b-bed1024077fd',
    },
    {
        title: 'Picks Of The Week',
        model: 'showMovieHybrid',
        carouselPresentationStyle: 'default',
        carouselId: '3f6c187d-9241-4596-a689-c245ca6642c6',
    },
    {
        title: 'Multi Region Test: Movies',
        model: 'showMovieHybrid',
        carouselPresentationStyle: 'default',
        carouselId: '7099976a-7ec3-4e5c-b0f9-b81968bb7210',
    },
    {
        title: 'Just Landed',
        model: 'showMovieHybrid',
        carouselPresentationStyle: 'default',
        carouselId: '9571f627-d865-4fd7-8385-998625d39c3c',
    },
    {
        title: 'Sports',
        model: 'showMovieHybrid',
        carouselPresentationStyle: 'default',
        carouselId: '96448056-16d6-46e4-8323-014a1d0d720f',
    },
    {
        title: 'Paramount+ Originals and Exclusives',
        model: 'showMovieHybrid',
        carouselPresentationStyle: 'default',
        carouselId: '19589685-2d31-4d8a-8f0b-bed1024077fd',
    },
    {
        title: 'Picks Of The Week',
        model: 'showMovieHybrid',
        carouselPresentationStyle: 'default',
        carouselId: '3f6c187d-9241-4596-a689-c245ca6642c6',
    },
    {
        title: 'Multi Region Test: Movies',
        model: 'showMovieHybrid',
        carouselPresentationStyle: 'default',
        carouselId: '7099976a-7ec3-4e5c-b0f9-b81968bb7210',
    },
    {
        title: 'Just Landed',
        model: 'showMovieHybrid',
        carouselPresentationStyle: 'default',
        carouselId: '9571f627-d865-4fd7-8385-998625d39c3c',
    },
    {
        title: 'Sports',
        model: 'showMovieHybrid',
        carouselPresentationStyle: 'default',
        carouselId: '96448056-16d6-46e4-8323-014a1d0d720f',
    },
    {
        title: 'Paramount+ Originals and Exclusives',
        model: 'showMovieHybrid',
        carouselPresentationStyle: 'default',
        carouselId: '19589685-2d31-4d8a-8f0b-bed1024077fd',
    },
    {
        title: 'Picks Of The Week',
        model: 'showMovieHybrid',
        carouselPresentationStyle: 'default',
        carouselId: '3f6c187d-9241-4596-a689-c245ca6642c6',
    },
    {
        title: 'Multi Region Test: Movies',
        model: 'showMovieHybrid',
        carouselPresentationStyle: 'default',
        carouselId: '7099976a-7ec3-4e5c-b0f9-b81968bb7210',
    },
    {
        title: 'Just Landed',
        model: 'showMovieHybrid',
        carouselPresentationStyle: 'default',
        carouselId: '9571f627-d865-4fd7-8385-998625d39c3c',
    },
    {
        title: 'Sports',
        model: 'showMovieHybrid',
        carouselPresentationStyle: 'default',
        carouselId: '96448056-16d6-46e4-8323-014a1d0d720f',
    },
    {
        title: 'Paramount+ Originals and Exclusives',
        model: 'showMovieHybrid',
        carouselPresentationStyle: 'default',
        carouselId: '19589685-2d31-4d8a-8f0b-bed1024077fd',
    },
    {
        title: 'Picks Of The Week',
        model: 'showMovieHybrid',
        carouselPresentationStyle: 'default',
        carouselId: '3f6c187d-9241-4596-a689-c245ca6642c6',
    },
    {
        title: 'Multi Region Test: Movies',
        model: 'showMovieHybrid',
        carouselPresentationStyle: 'default',
        carouselId: '7099976a-7ec3-4e5c-b0f9-b81968bb7210',
    },
    {
        title: 'Just Landed',
        model: 'showMovieHybrid',
        carouselPresentationStyle: 'default',
        carouselId: '9571f627-d865-4fd7-8385-998625d39c3c',
    },
    {
        title: 'Sports',
        model: 'showMovieHybrid',
        carouselPresentationStyle: 'default',
        carouselId: '96448056-16d6-46e4-8323-014a1d0d720f',
    },
    {
        title: 'Paramount+ Originals and Exclusives',
        model: 'showMovieHybrid',
        carouselPresentationStyle: 'default',
        carouselId: '19589685-2d31-4d8a-8f0b-bed1024077fd',
    },
    {
        title: 'Picks Of The Week',
        model: 'showMovieHybrid',
        carouselPresentationStyle: 'default',
        carouselId: '3f6c187d-9241-4596-a689-c245ca6642c6',
    },
    {
        title: 'Multi Region Test: Movies',
        model: 'showMovieHybrid',
        carouselPresentationStyle: 'default',
        carouselId: '7099976a-7ec3-4e5c-b0f9-b81968bb7210',
    },
];
var getConfigurationByIndex = function (start, size) {
    var data = configuration
        .map(function (item, index) { return (__assign(__assign({}, item), { carouselId: 'cus' + index, title: "".concat(item.title, "-").concat(index), model: index % 2 ? 'movie' : 'show' })); })
        .slice(start, start + size);
    return {
        data: data,
        total: configuration.length,
        start: start,
        end: start + size,
    };
};
exports.getConfigurationByIndex = getConfigurationByIndex;
