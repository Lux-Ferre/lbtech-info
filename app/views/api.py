import json
import requests
import time
import os

from datetime import datetime

from flask import jsonify, request, abort, send_from_directory
from app import app


def get_country_boundary(iso_a2):
    with open("app/static/assets/gazetteer/data/countryBorders.geo.json", "r") as f:
        data = json.load(f)

    features = data["features"]
    for value in features:
        if value["properties"]["iso_a2"] == iso_a2:
            return value
    return None


def get_general_country_info(iso_a2):
    username = app.config["GEONAMES_USERNAME"]

    url = f"http://api.geonames.org/countryInfo?country={iso_a2}&type=JSON&username={username}"

    parsed_data = {
        "name": "?",
        "area": "?",
        "capital": "?",
        "continent": "?",
        "iso_a2": "?",
        "iso_a3": "?",
        "currency_code": "?",
        "population": "?",
        "languages": "?",
    }

    try:
        response = requests.get(url)

        if response.status_code == 200:
            raw_data = response.json()
            data = raw_data["geonames"][0]

            continent_names = {
                "AF": "Africa",
                "AN": "Antarctica",
                "AS": "Asia",
                "EU": "Europe",
                "NA": "North America",
                "OC": "Oceania",
                "SA": "South America",
                "?": "?",
            }

            continent = continent_names[data.get("continent", "?")]

            parsed_data = {
                "name": data.get("countryName", "?"),
                "area": data.get("areaInSqKm", "?"),
                "capital": data.get("capital", "?"),
                "continent": continent,
                "iso_a2": data.get("countryCode", "?"),
                "iso_a3": data.get("isoAlpha3", "?"),
                "currency_code": data.get("currencyCode", "?"),
                "population": data.get("population", "?"),
                "languages": data.get("languages", "?"),
            }
    except:
        return parsed_data

    return parsed_data


def get_airports(iso_a2):
    username = app.config["GEONAMES_USERNAME"]

    url = f"http://api.geonames.org/searchJSON?q=airport&country={iso_a2}&maxRows=50&username={username}"

    parsed_data = {}

    try:
        response = requests.get(url)

        if response.status_code == 200:
            raw_data = response.json()
            data = raw_data["geonames"]

            for airport in data:
                parsed_data[airport["name"]] = {"lat": airport["lat"], "lng": airport["lng"]}
    except:
        return parsed_data

    return parsed_data


def get_hospitals(iso_a2):
    username = app.config["GEONAMES_USERNAME"]

    url = f"http://api.geonames.org/searchJSON?q=hospital&country={iso_a2}&maxRows=50&username={username}"

    parsed_data = {}

    try:
        response = requests.get(url)

        if response.status_code == 200:
            raw_data = response.json()
            data = raw_data["geonames"]

            for hospital in data:
                parsed_data[hospital["name"]] = {"lat": hospital["lat"], "lng": hospital["lng"]}
    except:
        return parsed_data

    return parsed_data


def get_cities(iso_a2):
    username = app.config["GEONAMES_USERNAME"]

    url = f"http://api.geonames.org/searchJSON?cities=cities15000&country={iso_a2}&maxRows=50&username={username}"

    parsed_data = {}

    try:
        response = requests.get(url)

        if response.status_code == 200:
            raw_data = response.json()
            data = raw_data["geonames"]

            for city in data:
                parsed_data[city["name"]] = {
                    "lat": city["lat"],
                    "lng": city["lng"],
                    "population": city["population"]
                }
    except:
        return parsed_data

    return parsed_data


def get_currency_data(currency_code):
    with open("app/static/assets/gazetteer/data/currencyNames.json", "r", encoding="UTF-8") as f:
        name_map = json.load(f)

    currency_data = {
        "currency_code": currency_code,
        "currency_name": name_map.get(currency_code, None)
    }

    key = app.config.get('EXCHANGERATE_API_KEY', None)
    url = f"https://v6.exchangerate-api.com/v6/{key}/latest/USD"

    currency_data["rates"] = []

    try:
        response = requests.get(url)

        if response.status_code == 200:
            raw_data = response.json()
            for code, rate in raw_data["conversion_rates"].items():
                currency_data["rates"].append({
                    "code": code,
                    "name": name_map.get(code, "N/A"),
                    "rate": rate
                })
    except:
        return currency_data

    return currency_data


def get_news_articles(iso_a2):
    valid_countries = ['ar', 'au', 'at', 'be', 'br', 'bg', 'ca', 'cn', 'co', 'cz', 'eg', 'fr', 'de', 'gr', 'hk', 'hu',
                      'in', 'id', 'ie', 'il', 'it', 'jp', 'lv', 'lt', 'my', 'mx', 'ma', 'nl', 'nz', 'ng', 'no', 'ph',
                      'pl', 'pt', 'ro', 'sa', 'rs', 'sg', 'sk', 'si', 'za', 'kr', 'se', 'ch', 'tw', 'th', 'tr', 'ae',
                      'ua', 'gb', 'us', 've']

    if iso_a2.lower() in valid_countries:
        locale = f"&countries={iso_a2}"
    else:
        locale = ""

    key = app.config.get("MEDIASTACK_KEY", None)

    date = datetime.now().strftime("%Y-%m-%d")

    url = f"http://api.mediastack.com/v1/news?access_key={key}{locale}&limit=5&languages=en&sort=popularity&categories=general&date={date}&sources=-google"

    news_articles = []

    try:
        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()
            news_articles = []
            for article in data["data"]:
                news_articles.append({
                    "title": article["title"],
                    "url": article["url"],
                    "source": article["source"],
                    "image": article["image"],
                })
    except:
        return news_articles

    return news_articles


def get_wiki(country_name):
    api_url = "https://en.wikipedia.org/w/api.php"

    params = {
        "action": "query",
        "format": "json",
        "prop": "extracts",
        "titles": country_name.replace(" ", "_"),
        "extracts": True,
        "explaintext": True,
        "exintro": True,
        "redirects": 1
    }

    wiki_data = {}

    try:
        response = requests.get(api_url, params=params)

        if response.status_code == 200:
            raw_data = response.json()
            page = next(iter(raw_data["query"]["pages"].values()))
            page_title = page["title"]
            page_title = page_title.replace(" ", "_")

            wiki_data["url"] = f"https://en.wikipedia.org/wiki/{page_title}"

            snippet_end = page["extract"].index(".", 400) or 400
            wiki_data["extract"] = page["extract"][:snippet_end]
    except:
        return wiki_data

    return wiki_data


def get_weather(capital):
    api_url = "http://api.weatherapi.com/v1/forecast.json"

    key = app.config["WEATHER_API_KEY"]

    params = {
        "key": key,
        "q": capital,
        "days": 3,
        "alerts": "yes"
    }

    weather_data = {}

    try:
        response = requests.get(api_url, params=params)

        if response.status_code == 200:
            raw_data = response.json()
            weather_data["raw"] = raw_data
            weather_data["alerts"] = []
            for alert in raw_data["alerts"]["alert"]:
                weather_data["alerts"].append(alert["headline"])
            weather_data["forecast"] = []

            for forecast in raw_data["forecast"]["forecastday"]:
                weather_data["forecast"].append({
                    "condition": "https:" + forecast["day"]["condition"]["icon"],
                    "max_temp": forecast["day"]["maxtemp_c"],
                    "min_temp": forecast["day"]["mintemp_c"],
                    "wind": forecast["day"]["maxwind_mph"],
                    "date": forecast["date"],
                })
    except:
        return weather_data

    return weather_data


@app.route("/api/country_list")
def get_country_list():
    with open("app/static/assets/gazetteer/data/countryBorders.geo.json", "r") as f:
        data = json.load(f)

    country_list = []

    features = data["features"]
    for value in features:
        name = value["properties"]["name"]
        iso_a2 = value["properties"]["iso_a2"]
        iso_a3 = value["properties"]["iso_a3"]
        if iso_a2 == "-99":
            continue
        country_list.append({
            "name": name,
            "iso_a2": iso_a2,
            "iso_a3": iso_a3
        })

    return jsonify(sorted(country_list, key=lambda d: d['name'])), 200


@app.route("/api/data")
def get_country_data():
    country_iso = request.args.get("iso_a2")

    geojson = get_country_boundary(country_iso)
    general = get_general_country_info(country_iso)
    currency = get_currency_data(general["currency_code"])
    news = get_news_articles(country_iso)
    airports = get_airports(country_iso)
    hospitals = get_hospitals(country_iso)
    cities = get_cities(country_iso)
    wiki = get_wiki(general["name"])
    weather = get_weather(general["capital"])

    response_data = {
        "geojson": geojson,
        "general": general,
        "currency": currency,
        "news": news,
        "airports": airports,
        "hospitals": hospitals,
        "cities": cities,
        "wiki": wiki,
        "weather": weather
    }

    return jsonify(response_data), 200


@app.route("/api/get_iso_from_coords")
def get_iso_from_coords():
    latitude = request.args.get("lat")
    longitude = request.args.get("long")
    username = app.config["GEONAMES_USERNAME"]

    url = f"http://api.geonames.org/countryCode?formatted=true&lat={latitude}&lng={longitude}&username={username}"

    response = requests.get(url)

    response_data = {
        "iso_a2": response.text.strip()
    }

    return jsonify(response_data), 200


@app.route("/api/download_cv")
def download_cv():
    filename = "shared/chris_milne_cv_2024.pdf"
    try:
        return send_from_directory("static", filename, as_attachment=True)
    except FileNotFoundError:
        abort(404)


@app.route("/api/get_all_tcg")
def get_all_tcg():
    r = requests.get("https://idle-pixel.com/get-tcg-info/")
    data = r.json()
    return jsonify(data), 200


@app.route("/api/get_user_tcg")
def get_user_tcg():
    user = request.args.get("user")
    r = requests.get(f"https://idle-pixel.com/tcg/get/?username={user}")

    card_count = {}
    card_list = r.json()["result"]
    for card in card_list:
        card_id = f"{card['card']}{'_h' if card['holo'] else ''}"
        if card_id in card_count:
            card_count[card_id] += 1
        else:
            card_count[card_id] = 1
    return jsonify(card_count), 200


@app.route("/api/sics")
def get_sics():
    json_path = os.path.join(app.static_folder, "projects/companies_house/sics.json")
    with open(json_path, mode="r", encoding="utf-8") as file:
        data = json.load(file)
    return jsonify(data), 200


@app.route("/api/chouse")
def get_companies_house():
    sic = request.args.get("sic", None)
    postcodes = request.args.get("postcodes", None).split(",")

    if sic is None or sic == "":
        return jsonify({"message": "Please provide SIC"}), 400

    if postcodes is None or postcodes == [""]:
        return jsonify({"message": "Please provide postcodes"}), 400

    apikey = app.config["COMPANIES_HOUSE_API_KEY"]

    root_endpoint = "https://api.company-information.service.gov.uk/"
    full_endpoint = root_endpoint + "advanced-search/companies?"

    data = []

    for postcode in postcodes:
        query = f"company_status=active&location={postcode}&size=500&sic_codes={sic}"
        full_query = full_endpoint + query

        headers = {'Authorization': apikey}

        api_response = requests.get(full_query, headers=headers)

        try:
            api_result = json.loads(api_response.content)["items"]
        except json.decoder.JSONDecodeError:
            api_result = []

        for company in api_result:
            data.append(company["company_name"])

        time.sleep(0.1)

    if len(data) == 0:
        data.append("No companies found matching the criteria. :c")

    return jsonify(data), 200
