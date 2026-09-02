/**
 * City landing pages. Each entry carries its own hand-written local copy —
 * these pages exist to rank for local intent, so nothing here is templated.
 */

export type CityStat = {
  value: string;
  label: string;
};

export type CitySection = {
  heading: string;
  paragraphs: string[];
};

export type City = {
  slug: string;
  name: string;
  /** Used in headings where the longer place name reads better. */
  longName: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  lede: string;
  /** One-line summary used on service-area cards and link previews. */
  blurb: string;
  stats: CityStat[];
  sections: CitySection[];
  businessTypes: string[];
  closing: string;
};

export const cities: City[] = [
  {
    slug: "abbotsford",
    name: "Abbotsford",
    longName: "Abbotsford",
    h1: "ATM Placement & ATM Services in Abbotsford, BC",
    metaTitle: "ATM Placement in Abbotsford, BC",
    metaDescription:
      "Free ATM placement and ATM sales in Abbotsford, BC. Hyosung Halo II machines, local same-day support and transparent surcharge sharing for Abbotsford retailers, restaurants and markets.",
    kicker: "Abbotsford, British Columbia",
    lede: "From Sevenoaks and Highstreet to the Sumas Prairie farm stands, Abbotsford runs on volume — and a working ATM inside your door keeps that volume from walking out of it.",
    blurb:
      "The Fraser Valley's largest city — dense retail corridors plus a working agricultural base.",
    stats: [
      {
        value: "160k+",
        label: "Residents in the Fraser Valley's largest city",
      },
      { value: "Hwy 1", label: "Direct corridor traffic through the city" },
      { value: "Halo II", label: "Hyosung hardware on every placement" },
    ],
    sections: [
      {
        heading: "Why Abbotsford businesses put an ATM on the floor",
        paragraphs: [
          "Abbotsford is the largest city in the Fraser Valley and the commercial anchor for everything east of Langley. It is also two very different economies stacked on top of each other: a dense retail and restaurant corridor running through Clearbrook, Sevenoaks, Highstreet and Historic Downtown, and a working agricultural base out across the Sumas Prairie and Matsqui flats that moves an enormous amount of product through farm gates, packing houses and roadside stands.",
          "Both halves of that economy still handle cash daily. Berry and vegetable stands take it because a card terminal on a folding table in July is impractical. Independent grocers, halal and South Asian markets along South Fraser Way take it because their margins do not survive a three percent interchange bite on a $12 basket. Barbers, nail salons, tattoo studios and food trucks take it because their average ticket is small and their customers expect to pay in cash. When those businesses do not have an ATM on site, the customer leaves to find one — and a meaningful share of them do not come back that afternoon.",
        ],
      },
      {
        heading: "The Abbotsford businesses we place machines in",
        paragraphs: [
          "We look for locations where people are already standing still: a queue, a table, a waiting room. Abbotsford has a lot of them. Licensed venues and pubs near Downtown and the Abbotsford Entertainment & Sports Centre see a hard cash spike on event nights, and a cash-only tab or a tip-out is easier when the machine is twenty feet away. Convenience stores and gas bars on the Highway 1 on-ramps catch travellers who want cash before the drive east. Community halls, gurdwara-adjacent shops, laundromats and vape and smoke shops all run on the same pattern.",
          "The other Abbotsford pattern worth naming is events. Farmers markets, the Agrifair grounds, sports tournaments at Rotary Stadium and seasonal festivals bring thousands of people through venues that host dozens of small independent vendors — and those vendors get paid in cash. A single well-placed machine at the venue entrance can carry an entire weekend.",
        ],
      },
      {
        heading: "What you get with Lively Cash in Abbotsford",
        paragraphs: [
          "Every machine we place is a Hyosung Halo II — a current-generation ATM with a bright, responsive touchscreen, a clean modern shell that suits a nice retail interior, and the reliability record to back it up. It is not a refurbished box from 2009 with a sun-bleached screen. Customers trust the machine they are putting their card into, and that matters more than most operators expect.",
          "Because we are based in the Fraser Valley, an Abbotsford service call does not get queued behind a Vancouver route or escalated to a national dispatch centre in another province. We are a short drive from every part of the city. If a machine is out of paper on a Saturday or the vault needs attention before a long weekend, that is a same-week problem at worst and usually a same-day one.",
          "You also get a straight answer on money. Depending on the program you choose, you either own the machine and keep the lion's share of every surcharge, load your own cash and split the surcharge with us, or hand the whole thing over and collect a cheque for doing nothing. The terms are written down, the numbers are on the plans page, and nobody has to guess what they signed.",
        ],
      },
    ],
    businessTypes: [
      "Convenience stores & gas bars",
      "Independent grocers & ethnic markets",
      "Pubs, lounges & licensed venues",
      "Barbers, salons & tattoo studios",
      "Farm stands & farmers markets",
      "Laundromats & self-serve businesses",
      "Event venues & community halls",
      "Restaurants & food trucks",
    ],
    closing:
      "If you run a business anywhere from Aldergrove Border to Whatcom Road, we can have a Halo II installed, connected and stocked without disrupting a single trading day.",
  },
  {
    slug: "chilliwack",
    name: "Chilliwack",
    longName: "Chilliwack",
    h1: "ATM Placement & ATM Services in Chilliwack, BC",
    metaTitle: "ATM Placement in Chilliwack, BC",
    metaDescription:
      "ATM placement, sales and service in Chilliwack, BC. Free Hyosung Halo II placement for Chilliwack pubs, retailers, markets and Cultus Lake seasonal businesses, with local Fraser Valley support.",
    kicker: "Chilliwack, British Columbia",
    lede: "Chilliwack has added retail, restaurants and residents faster than almost anywhere in the Valley — and a lot of those new customers still arrive with cash in mind.",
    blurb:
      "Fast-growing retail and hospitality, with a huge seasonal spike out at Cultus Lake.",
    stats: [
      { value: "Fastest", label: "Growing retail scene in the eastern Valley" },
      { value: "Seasonal", label: "Cultus Lake & event traffic every summer" },
      { value: "Local", label: "Service techs based in the Fraser Valley" },
    ],
    sections: [
      {
        heading: "A growing market with an old-fashioned cash habit",
        paragraphs: [
          "Chilliwack has changed shape quickly. Garrison Crossing, Promontory and the Vedder corridor have filled in with new housing, and the commercial strips through Sardis, Cottonwood and downtown Chilliwack have followed. What has not changed is how a lot of the local economy actually settles up. Farm-gate sales, trades, second-hand markets, community sports, church and hall rentals, food trucks and the enormous Cultus Lake summer trade all still run heavily on cash.",
          "That combination — rising foot traffic plus persistent cash demand — is exactly the condition where an on-site ATM pays for itself. Every business owner in town knows the specific moment: a customer at the counter realises the tap is not going to work for this purchase, and asks where the nearest machine is. If the answer is 'four blocks that way,' you have just handed the sale to whoever is between here and there.",
        ],
      },
      {
        heading: "Where an ATM earns its keep in Chilliwack",
        paragraphs: [
          "Hospitality is the obvious one. Chilliwack's pub, brewery and restaurant scene has grown substantially, and licensed rooms have a cash pattern that never goes away — tabs, tips, VLT-adjacent habits, and the customer who does not want a bar charge on a shared card statement. A machine near the entrance of a busy room is one of the highest-turnover placements we install anywhere in the Valley.",
          "Seasonal and event locations are the other. Cultus Lake absolutely floods between May and September, and the businesses around it — campgrounds, marinas, waterpark concessions, ice cream shops, corner stores — do a large share of their annual revenue in a narrow window where every hour of downtime is expensive. The same applies to Heritage Park during show weekends, to the corn maze and pumpkin patch season, to junior hockey nights at the Chilliwack Coliseum, and to the farmers markets and fall fairs that draw vendors from across the Valley.",
          "Then there is the steady, unglamorous middle: convenience stores, gas bars on the Highway 1 exits, laundromats, barbers, nail salons, smoke shops, taxi stands and the auto trades along Yale Road. None of them are destination businesses on their own, but all of them lose a real percentage of transactions when there is no cash on hand.",
        ],
      },
      {
        heading: "Modern hardware, and a phone number that answers",
        paragraphs: [
          "We place the Hyosung Halo II. It is a current-generation machine with a large, bright interactive display that walks the customer through the transaction quickly — which matters when there are three people in line behind them. It reads as modern rather than as an afterthought bolted into a corner, and it holds up in the high-cycle, seven-days-a-week environments Chilliwack businesses put it in.",
          "Being local is the part we would actually stake the relationship on. When a Chilliwack machine needs attention, the person coming out is already in the Fraser Valley — not routing from the Lower Mainland behind a full day of Vancouver calls, and not a ticket in a national queue. For a seasonal business, the difference between a same-day fix and a five-day wait in July is not a service-level detail. It is the season.",
        ],
      },
    ],
    businessTypes: [
      "Pubs, breweries & licensed venues",
      "Cultus Lake seasonal businesses",
      "Campgrounds & marinas",
      "Convenience stores & gas bars",
      "Restaurants & food trucks",
      "Barbers, salons & smoke shops",
      "Event venues & fairgrounds",
      "Laundromats & auto trades",
    ],
    closing:
      "Whether you trade year-round downtown or run flat out for four months at the lake, we will size the program around how your business actually makes money.",
  },
  {
    slug: "hope",
    name: "Hope",
    longName: "Hope",
    h1: "ATM Placement & ATM Services in Hope, BC",
    metaTitle: "ATM Placement in Hope, BC",
    metaDescription:
      "ATM placement and service in Hope, BC. Free Hyosung Halo II placement for Hope gas stations, diners, motels and highway-corridor businesses, backed by a local Fraser Valley team.",
    kicker: "Hope, British Columbia",
    lede: "Four highways meet in Hope, and almost everyone who stops here is passing through — which makes cash access a service you provide, not an amenity you offer.",
    blurb:
      "Four highways, constant traveller turnover, and no convenient alternative machine.",
    stats: [
      { value: "4", label: "Major highways converging on the town" },
      { value: "24/7", label: "Monitoring available on placed machines" },
      { value: "Wireless", label: "DPL connectivity where internet is thin" },
    ],
    sections: [
      {
        heading: "Hope runs on people who are not from here",
        paragraphs: [
          "Hope sits at the junction where Highway 1, the Coquihalla, the Crowsnest and Highway 7 all come together. It is the last real stop before the interior and the first real stop coming down out of it, and that geography defines the local economy more than anything else. The customers walking into a Hope business are overwhelmingly travellers: truckers, road-trippers, hunters and anglers, families on the way to the Okanagan, motorcyclists doing the Fraser Canyon loop, and crews working the corridor.",
          "Travellers are a distinctly cash-friendly customer base. They are paying for firewood at a campground, a tip at a diner, a small purchase from a roadside vendor, a fee at a trailhead, or a room at a motel that would rather not eat card fees on a $110 night. They also arrive having just spent two or three hours somewhere with no services, and 'is there a bank machine?' is one of the first things they ask.",
        ],
      },
      {
        heading: "Why the corridor makes an on-site machine unusually valuable",
        paragraphs: [
          "In a city, a customer who needs cash walks to the machine down the block and comes back. In Hope, they get in the car. Once someone is back on the highway, they are gone — and if they are heading east, the next meaningful service stop is a long way away. That asymmetry is why highway-corridor businesses see some of the strongest per-machine transaction volumes we place anywhere: the alternative to your ATM is not a competing ATM, it is nothing.",
          "Seasonality and weather add to it. Long-weekend traffic, summer touring season, and the winter closures and chain-up delays that back travellers into town all produce sudden surges of people with time to spend and a need for cash. Businesses that are ready for those surges do very well out of them.",
          "Connectivity is the practical wrinkle in Hope, and we plan for it. Not every building along the corridor has reliable business internet, and some owners would rather not put a payment device on their own network at all. Our machines can run on a DPL wireless communication device — a secure connection of their own — so a placement does not depend on the state of your Wi-Fi or on a router in the back office that gets unplugged when the freezer needs an outlet.",
        ],
      },
      {
        heading: "What a Hope placement looks like",
        paragraphs: [
          "We install the Hyosung Halo II: a modern, bright-screened machine that is quick to use and legible to somebody who has been driving for four hours. It is bolted and secured properly at installation, and on our monitored programs we watch uptime and cash levels remotely, so a machine that goes down or runs dry gets flagged rather than discovered by a customer.",
          "We are Fraser Valley based, so Hope is a drive we make, not a dispatch we outsource. And if you would rather not think about any of it, the Turnkey program covers the machine, the installation, the stocking and the maintenance — you provide the floor space and the power outlet, and we handle the rest.",
        ],
      },
    ],
    businessTypes: [
      "Gas stations & truck stops",
      "Diners, cafés & family restaurants",
      "Motels, inns & campgrounds",
      "Convenience & general stores",
      "Outdoor, tackle & hunting retailers",
      "Pubs & liquor stores",
      "Visitor-facing retail & gift shops",
      "Trailhead & recreation businesses",
    ],
    closing:
      "If your customers are passing through, give them a reason to stop longer and spend more before they get back on the highway.",
  },
  {
    slug: "harrison",
    name: "Harrison",
    longName: "Harrison Hot Springs",
    h1: "ATM Placement & ATM Services in Harrison Hot Springs, BC",
    metaTitle: "ATM Placement in Harrison Hot Springs, BC",
    metaDescription:
      "ATM placement and service in Harrison Hot Springs, BC. Free Hyosung Halo II placement for Harrison resorts, beachfront retail, campgrounds and seasonal tourism businesses.",
    kicker: "Harrison Hot Springs, British Columbia",
    lede: "A village of a couple of thousand people that hosts a small city's worth of visitors every summer — Harrison's cash demand is seasonal, sharp, and entirely predictable.",
    blurb:
      "A resort village whose summer visitor volume dwarfs its resident population.",
    stats: [
      { value: "Summer", label: "Visitor surge that dwarfs the resident base" },
      { value: "Weekly", label: "Cash stocking on Turnkey placements" },
      { value: "Halo II", label: "Bright display for high-traffic lobbies" },
    ],
    sections: [
      {
        heading: "Tourism money is cash money",
        paragraphs: [
          "Harrison Hot Springs is a resort village, and its business calendar is shaped almost entirely by visitors. The lake, the beach, the hot springs and the campgrounds pull people in from across the Lower Mainland, Washington State and further afield, and the summer population multiplies far beyond the permanent residents. Then there are the events — the sand sculpture weekends on the beach, Sasquatch Days, the fall and winter eagle-viewing season along the Harrison and Chehalis — each of which lands a wave of visitors on the village at once.",
          "Visitors on vacation behave differently than locals doing errands. They buy ice cream, mini-golf rounds, paddleboard rentals, souvenirs, firewood, parking, market stalls and small food purchases, and a large share of that is small-ticket spending where cash is either preferred by the merchant or expected by the customer. Many visitors deliberately carry cash on a trip to keep a lid on holiday spending — and when they run out, they need a machine, quickly, without leaving the village.",
        ],
      },
      {
        heading: "The cost of not having one on site",
        paragraphs: [
          "Harrison's geography makes an empty pocket a bigger problem here than it would be in a city. There is no dense grid of bank branches to walk to. A visitor who cannot get cash at the beachfront either abandons the purchase or drives to Agassiz — and once a family is in the car on a hot afternoon, the odds of them coming back to your counter are poor.",
          "The reverse is also true, and it is the part operators underestimate. A visible, working ATM changes the spending pattern of the people already in your business. Someone who came in for one thing withdraws forty or sixty dollars, and most of that gets spent within a hundred metres of the machine. In a compact village where the businesses are clustered together, that lift is measurable.",
          "Peak-season reliability is everything here. A machine that runs out of cash on the Saturday of a long weekend is not a minor inconvenience — it is the busiest fifty hours of the quarter, gone. That is why our monitored programs track cash levels and uptime remotely, and why Turnkey placements are stocked weekly rather than whenever somebody gets around to it.",
        ],
      },
      {
        heading: "Hardware and service built for a seasonal business",
        paragraphs: [
          "The Hyosung Halo II we install has a large, bright interactive display that reads clearly in a sunlit lobby or a busy beachfront storefront, and it moves customers through a transaction fast enough to keep a summer queue from stalling. It is secured and professionally bolted at installation, which matters in a village where a lot of buildings are open to the public seven days a week in peak season.",
          "Because we are a Fraser Valley company, Harrison is a short run for us rather than a remote outpost at the end of a service map. That is the practical case for going local: when your revenue is compressed into a handful of months, the response time on a service call is not an abstract SLA number. It is the difference between a good season and an expensive one.",
        ],
      },
    ],
    businessTypes: [
      "Resorts, hotels & B&Bs",
      "Beachfront retail & gift shops",
      "Campgrounds & RV parks",
      "Ice cream, cafés & takeaway food",
      "Boat, kayak & paddleboard rentals",
      "Pubs, restaurants & patios",
      "Markets, festivals & event vendors",
      "Convenience & general stores",
    ],
    closing:
      "Get a machine in place before the season starts, and let the summer pay for itself.",
  },
  {
    slug: "agassiz",
    name: "Agassiz",
    longName: "Agassiz",
    h1: "ATM Placement & ATM Services in Agassiz, BC",
    metaTitle: "ATM Placement in Agassiz, BC",
    metaDescription:
      "ATM placement and service in Agassiz, BC. Free Hyosung Halo II placement for Agassiz farm markets, agri-tourism operators, cafés and District of Kent businesses.",
    kicker: "Agassiz, British Columbia",
    lede: "Farm gates, market stalls and agri-tourism weekends: Agassiz is one of the most genuinely cash-driven local economies left in the Fraser Valley.",
    blurb:
      "Farm gates, u-picks and agri-tourism weekends — one of the Valley's most cash-driven markets.",
    stats: [
      { value: "Farm-gate", label: "Sales that still settle in cash" },
      { value: "Fall Fair", label: "And a full agri-tourism calendar" },
      { value: "Free", label: "Placement, install and setup on Turnkey" },
    ],
    sections: [
      {
        heading: "An economy that never stopped using cash",
        paragraphs: [
          "Agassiz and the wider District of Kent sit on some of the best farmland in British Columbia, and the businesses here reflect it: dairy and hazelnut operations, corn and berry growers, greenhouses, an artisan cheese and preserves trade, farm stands, u-picks and the agricultural research station that has anchored the area for over a century. Highway 7 carries traffic through on the way to Harrison and the eastern Valley, and the Circle Farm Tour brings a steady stream of visitors who came specifically to buy directly from producers.",
          "Direct-to-consumer farm sales are the most cash-intensive retail there is. An honour-box stand at the end of a driveway, a card table at a u-pick, a vendor stall at a weekend market — none of these are places where a full card terminal makes sense, and the margins on a $6 bag of hazelnuts or a $4 dozen eggs do not tolerate processing fees. Growers here have every reason to keep taking cash, and their customers know to bring it.",
        ],
      },
      {
        heading: "Agri-tourism concentrates the demand",
        paragraphs: [
          "What makes Agassiz distinct from a purely rural market is how much of the year is organised around events. The Agassiz Fall Fair and Corn Festival, farm tours, seasonal corn mazes and pumpkin patches, Christmas markets, and the eagle-viewing season along the Harrison and Fraser all bring visitors in concentrated bursts — and those visitors arrive at venues hosting a dozen or more small independent vendors who are paid in cash and often cannot process cards at all.",
          "For a host site, that is the whole argument. One machine near the gate serves every vendor on the grounds and every visitor who underestimated how much cash they would need. Vendors sell more, the venue takes surcharge revenue on volume it would never see otherwise, and nobody has to send a customer down the road to Harrison or across to Chilliwack to find a bank machine.",
          "The same logic applies year-round at the businesses on Pioneer Avenue and along the highway: the café, the pub, the general store, the feed and hardware suppliers, the campgrounds and the small motels. Rural service businesses in particular still see a large share of customers who prefer to settle in cash, and the nearest alternative machine is rarely convenient.",
        ],
      },
      {
        heading: "Practical placement for rural sites",
        paragraphs: [
          "We install the Hyosung Halo II — modern, reliable, with a bright interactive display that is easy to use for every age group in a rural customer base. Where a site does not have solid business internet, or where an owner would rather keep a payment device off their own network entirely, the machine can run on a DPL wireless communication device instead. For seasonal or event placements that flexibility is often the deciding factor.",
          "We are local, which for Agassiz means service actually shows up. Being a smaller community should not mean being last on a route out of Vancouver, and it does not with us. And if you would rather not own or stock anything, the Turnkey program puts a free machine on your floor, installs and secures it, monitors it, stocks it weekly and maintains it — you do nothing at all.",
        ],
      },
    ],
    businessTypes: [
      "Farm markets & farm-gate stands",
      "U-picks & agri-tourism venues",
      "Fairgrounds & event sites",
      "Cafés, pubs & restaurants",
      "General stores & convenience",
      "Feed, hardware & rural supply",
      "Campgrounds & small motels",
      "Artisan food producers",
    ],
    closing:
      "If your busiest weekends are the ones where every vendor on site needs cash, an ATM at the gate is the cheapest revenue you will add all year.",
  },
];

export function getCity(slug: string): City | undefined {
  return cities.find((city) => city.slug === slug);
}

export const citySlugs = cities.map((city) => city.slug);
