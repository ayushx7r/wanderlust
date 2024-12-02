const Listing = require("../models/listing");
const fetch = require("node-fetch");

module.exports.index = async (req, res, next) => {
    if(req.session.redirectUrl) {
        delete req.session.redirectUrl;
    }
    const listings = await Listing.find({}).populate("reviews");
    res.render("./listings/index.ejs", {listings});
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;

    let listing = new Listing(req.body.listing);
    listing.owner = req.user;
    listing.image = {url, filename};

    let place = listing.location + "," + listing.country;
    let api = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`;

    let result = await fetch(api);
    let data = await result.json();

    let lon = data[0].lon;
    let lat = data[0].lat;

    let coordinates = [lon, lat];
    listing.coordinates = coordinates;

    await listing.save();

    req.flash("success", "Listing added successfully");
    res.redirect("/listings");
};

module.exports.showListing = async (req, res, next) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("owner").populate({path : "reviews", populate : {path : "author"}});
    if(!listing) {
        req.flash("error", "Listing not found");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});   
};

module.exports.renderEditForm = async (req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing not found");
        res.redirect("/listings");
    }

    let newImageUrl = listing.image.url.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", {listing, newImageUrl});
};

module.exports.updateListing = async (req, res, next) => {
    let listing = req.body.listing;

    if(req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
    }

    let place = listing.location + "," + listing.country;
    let api = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`;

    let result = await fetch(api);
    let data = await result.json();

    let lon = data[0].lon;
    let lat = data[0].lat;

    let coordinates = [lon, lat];
    listing.coordinates = coordinates;

    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...listing});
    req.flash("success", "Listing updated successfully");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res, next) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully");
    res.redirect("/listings");
};