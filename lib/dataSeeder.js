'use strict';

const mongoose = require('mongoose'),
    Category = require('../models/category'),
    ProductType = require('../models/productType'),
    Feature = require('../models/feature');

const dataSeeder = function () {
    const seed = async () => {
        console.log('Checking if database needs to be seeded...');
        try {
            const collinfo = await mongoose.connection.db.listCollections({ name: 'productTypes' }).next();
            const collectionName = collinfo ? collinfo.name : undefined;
            const docCount = collectionName ? await mongoose.connection.db.collection(collectionName).countDocuments() : 0;
            console.log('Collection name: ' + collectionName);
            console.log('Document count: ' + docCount);
            if (!collectionName || docCount === 0) {
              console.log('Starting dbSeeder...');
              seedData();
            } else {
              console.log('Database already seeded. Moving on...');
            }
        } catch (error) {
            console.error('Error checking the collection during seeding:', error.message);
        }
    },

        seedData = async () => {

            /*
             ########################################################################################
                                           Product Types (for top menu on site)
             ########################################################################################
             */
            var videoProductType = new ProductType({
                title: "Videos",
                linkTitle: "Videos",
                iconCssClass: "fa-play-circle",
                description: "Get the highest quality video training out there!"
            });

            var trainingProductType = new ProductType({
                title: "Training",
                linkTitle: "Training",
                iconCssClass: "fa-users",
                description: "Looking for expert onsite training for your team? We provide training on a range of technologies and have experts who know how to teach - not just talk!"
            });

            var trainingMaterialsProductType = new ProductType({
                title: "Courseware",
                linkTitle: "Courseware",
                iconCssClass: "fa-file-text",
                description: "License our top-notch courseware, hands-on labs and code samples."
            });

            try {
                await videoProductType.save();
                await trainingProductType.save();
                await trainingMaterialsProductType.save();
            } catch (error) {
                console.log('Error saving product types: ' + error.message);
            }

            /*
             ########################################################################################
                                                General Categories
             ########################################################################################
             */

            var nodeCategory = new Category({
                title: "Node.js Courses",
                imageUrl: "",
                cssClass: "nodeCategory"
            });

            var jsCategory = new Category({
                title: "JavaScript Courses",
                imageUrl: "",
                cssClass: "javascriptCategory"
            });

            try {
                await nodeCategory.save();
                await jsCategory.save();
            }
            catch (error) {
                console.log('Error saving categories: ' + error.message);
            }

            /*
            ########################################################################################
                                                Features
            ########################################################################################
             */


            var feature1 = new Feature({
                position: 0,
                isFeatured: true,
                title: "Angular JumpStart",
                text: "The most productive way to learn Angular! JumpStart your learning with this step-by-step video course!",
                highlightText: "Over 6 hours of content!",
                link: "/products/training",
                linkText: "Get Details",
                highlightText: "Over 6 hours of content!",
                backgroundImageUrl: "/img/background_girl_1920x500.jpg"
            });

            var feature2 = new Feature({
                position: 3,
                isFeatured: true,
                title: "Angular Custom Directives",
                text: "Dive in to Angular and learn how to build custom directives!",
                highlightText: "Advanced Angular Content!",
                link: "/products/training",
                linkText: "Get Details",
                highlightText: "Advanced Angular Content!",
                backgroundImageUrl: "/img/background_man_couch_1920x500.jpg"
            });

            var feature3 = new Feature({
                position: 2,
                isFeatured: true,
                title: "Focused Onsite Training",
                text: "World-class JavaScript, Angular, Node.js, C#, ASP.NET MVC (and more) training at your location. Whether you're located in the middle of nowhere or in a high-rise corporate building.",
                link: "/products/training",
                linkText: "Get Details",
                backgroundImageUrl: "/img/background_road_1920x500.jpg",
                customCssClass: "white"
            });

            var feature4 = new Feature({
                position: 1,
                isFeatured: true,
                title: "World-Class Onsite Training",
                text: "We provide the worlds best hands-on training at your location. Anywhere in the world!",
                link: "/products/training",
                linkText: "Get Details",
                backgroundImageUrl: "/img/background_singapore_1920x500.jpg"
            });

            try {
                await feature1.save();
                await feature2.save();
                await feature3.save();
                await feature4.save();

                console.log('Data seeded!');
            }
            catch (error) {
                console.log('Error saving features: ' + error.message);
            }

        };


    return {
        seed: seed,
        seedData: seedData
    };

}();

module.exports = dataSeeder;

