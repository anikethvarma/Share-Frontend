import {
  Form,
  Container,
  Row,
  Col,
  Button,
  Card,
  Dropdown,
} from "react-bootstrap";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const express_url = "https://share-backend-7i3d.onrender.com";

const caste_category = {
  OC: [
    "Brahmin",
    "Kshatriya",
    "Kamma",
    "Kapu",
    "Reddy",
    "Vyshya",
    "Velama Dora",
    "Marwadi",
    "Jain",
    "Sindh",
    "Others",
  ],
  BC: ["BC A", "BC B", "BC C", "BC D"],
};

const blood_groups = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
const districts = {
  "": [],
  "Andhra Pradesh": [
    "Alluri Sithramam Raju",
    "Anakapalli",
    "Ananthapuramu",
    "Annamayya",
    "Bapatla",
    "Chittoor",
    "East Godavari",
    "Eluru",
    "Guntur",
    "Kadapa",
    "Kakinada",
    "Konaseema",
    "Krishna",
    "Kurnool",
    "Nandyal",
    "Nellore",
    "NTR",
    "Palnadu",
    "Parvathipuram Manyam",
    "Prakasam",
    "Sri Satya Sai",
    "Srikakulam",
    "Tirupathi",
    "Visakhapatnam",
    "Vizianagaram",
    "West Godavari",
  ],
  Telangana: [
    "Adilabad",
    "Bhadradri Kothagudem",
    "HanumaKonda",
    "Hyderabad",
    "Jagtial",
    "Jangaon",
    "Jayashankar Bhupalpally",
    "Jogulamba Gadwal",
    "Kamareddy",
    "Karimnagar",
    "Khammam",
    "Kumuram Bheem Asifabad",
    "Mahabubad",
    "Mahabubanagar",
    "Mancherial",
    "Medak",
    "Medchal-Malkajgiri",
    "Mulugu",
    "Nagarkurnool",
    "Nalgonda",
    "Narayanpet",
    "Nirmal",
    "Nizamabad",
    "Peddapalli",
    "Rajanna Siricilla",
    "Ranga Reddy",
    "Sangareddy",
    "Siddipet",
    "Suryapet",
    "Vikarabad",
    "Wanaparthy",
    "Warangal",
    "Yadadri Bhuvanagiri",
  ],
};

const constituencies = {
  "": [],
  "Alluri Sithramam Raju": ["Araku Valley", "Paderu", "Rampachodavaram"],
  Anakapalli: [
    "Anakapalli",
    "Chodavaram",
    "Madugula",
    "Narsipatnam",
    "Payakaraopeta",
    "Yelamanchili",
  ],
  Ananthapuramu: [
    "Anantapur Urban",
    "Guntakal",
    "Kalyandurg",
    "Raptadu",
    "Rayadurg",
    "Singanamala",
    "Tadipatri",
    "Uravakonda",
  ],
  Annamayya: [
    "Kodur",
    "Madanapalle",
    "Pileru",
    "Rajampet",
    "Rayachoti",
    "Thamballapalle",
  ],
  Bapatla: ["Addanki", "Bapatla", "Chirala", "Parchur", "Repalle", "Vemuru"],
  Chittoor: [
    "Chittoor",
    "Gangadhara Nellore",
    "Kuppam",
    "Nagari",
    "Palamaner",
    "Punganur",
    "Puthalapattu",
  ],
  "East Godavari": [
    "Anaparthy",
    "Gopalapuram",
    "Kovvur",
    "Nidadavole",
    "Rajahmundry City",
    "Rajamahendravaram Rural",
    "Rajanagaram",
  ],
  Eluru: ["Chintalapudi", "Denduluru", "Eluru", "Kaikalur", "Nuzvid", "Polavaram", "Unguturu"],
  Guntur: ["Guntur East", "Guntur West", "Mangalgiri", "Ponnuru", "Prathipadu", "Tadikonda", "Tenali"],
  Kadapa: ["Badvel", "Jammalamadugu", "Kadapa", "Kamalapuram", "Mydukur", "Proddatur", "Pulivendula"],
  Kakinada: ["Jaggampeta", "Kakinada City", "Kakinada Rural", "Peddapuram", "Pithapuram", "Prathipadu", "Tuni"],
  Konaseema: ["Amalapuram", "Gannavarm", "Kothapeta", "Mandapeta", "Mummidivaram", "Ramachandrapuram", "Razole"],
  Krishna: ["Avanigadda", "Gannavaram", "Gudivada", "Machilipatnam", "Pamarru", "Pedana", "Penamaluru"],
  Kurnool: ["Adoni", "Alur", "Kodumur", "Kurnool", "Mantralayam", "Panyam", "Pattikonda", "Yemmiganur"],
  Nandyal: ["Allagadda", "Banaganapalle", "Dhone", "Nandikotkur", "Nandiyal", "Srisailam"],
  Nellore: ["Atmakur", "Kandukuru", "Kavali", "Kovur", "Nellore City", "Nellore Rural", "Sarvepalli", "Udayagiri"],
  NTR: ["Jaggayyapeta", "Mylavaram", "Nandigama", "Tiruvuru", "Vijayawada Central", "Vijayawada East", "Vijayawada West"],
  Palnadu: ["Chilakaluripet", "Gurazala", "Macherla", "Narasaraopet", "Pedakurapadu", "Sattenapalle", "Vinukonda"],
  "Parvathipuram Manyam": ["Kurupam", "Palakonda", "Parvathipuram", "Salur"],
  Prakasam: ["Darsi", "Giddalur", "Kanigiri", "Kondapi", "Markapuram", "Ongole", "Santhanuthalapadu", "Yerragondapalem"],
  "Sri Satya Sai": ["Dharmavaram", "Hindupur", "Kadiri", "Madakasira", "Penukonda", "Puttaparthi"],
  Srikakulam: ["Amadalavalasa", "Etcherla", "Ichchapuram", "Narasannapeta", "Palasa", "Pathapatnam", "Tekkali", "Srikakulam"],
  Tirupathi: ["Chandragiri", "Gudur", "Satyavedu", "Srikalahasti", "Sullurpeta", "Tirupati", "Venkatagiri"],
  Visakhapatnam: ["Bhimili", "Gajuwaka", "Pendurthi", "Visakhapatnam East", "Visakhapatnam North", "Visakhapatnam South", "Visakhapatnam West"],
  Vizianagaram: ["Bobbili", "Cheepurupalli", "Gajapathinagaram", "Nellimarla", "Rajam", "Srungavarapukota", "Vizianagaram"],
  "West Godavari": ["Achanta", "Bhimavaram", "Narasapuram", "Palakollu", "Tadepalligudem", "Tanuku", "Undi"],
  Adilabad: ["Adilabad", "Boath"],
  "Bhadradri Kothagudem": ["Aswaraopeta", "Bhadrachalam", "Kothagudem", "Pinapaka", "Yellandu"],
  HanumaKonda: ["Parkal", 'Warangal West'],
  Hyderabad: ["Amberpet", "Bahadurpura", "Chandrayangutta", "Charminar", "Goshamahal", "Jubilee Hills", "Karwan", "Khairatabad", "Malakpet", "Musheerabad", "Nampally", "Sanathnagar", "Secunderabad", "Secunderabad Cantt", "Yakutpura"],
  Jagtial: ["Dharmapuri", "Jagtial", "Koratla"],
  Jangaon: ["Ghanpur", "Jangaon", "Palakurthi"],
  "Jayashankar Bhupalpally": ["Bhupalpalle", ],
  "Jogulamba Gadwal": ["Alampur", "Gadwal"],
  Kamareddy: ["Jukkal", "Kamareddy", "Yellareddy"],
  Karimnagar: ["Choppadandi", "Huzurabad", "Karimnagar", "Manakondur"],
  Khammam: ["Khammam", "Madhira", "Palair", "Sathupalle", "Wyra"],
  "Kumuram Bheem Asifabad": ["Asifabad", "Sirpur"],
  Mahabubad: ["Dornakal", "Mahabubabad"],
  Mahabubanagar: ["Devarkadra", "Jadcherla", "Mahbubnagar"],
  Mancherial: ["Bellampalli", "Chennur", "Mancherial"],
  Medak: ["Medak", "Narsapur"],
  "Medchal-Malkajgiri": ["Kukatpally", "Malkajgiri", "Medchal", "Quthbullapur", "Uppal"],
  Mulugu: ["Mulugu"],
  Nagarkurnool: ["Achampet", "Kollapur", "Nagarkurnool"],
  Nalgonda: ["Devarakonda", "Miryalaguda", "Munugode", "Nagarjuna Sagar", "Nakrekal", "Nalgonda"],
  Narayanpet: ["Makthal", "Narayanpet"],
  Nirmal: ["Khanapur", "Mudhole", "Nirmal"],
  Nizamabad: ["Armur", "Balkonda", "Banswada", "Bodhan", "Nizamabad (Rural)", "Nizamabad (Urban)"],
  Peddapalli: ["Manthani", "Peddapalle", "Ramagundam"],
  "Rajanna Siricilla": ["Sircilla", "Vemulawada"],
  "Ranga Reddy": ["Chevella", "Ibrahimpatnam", 'Kalwakurthy', "Lal Bahadur Nagar", "Maheswaram", "Rajendranagar", "Serilingampally", "Shadnagar"],
  Sangareddy: ["Andole","Narayankhed", "Patancheru", "Sangareddy", "Zaheerabad"],
  Siddipet: ["Dubbak", "Gajwel", "Husnabad", "Siddipet"],
  Suryapet: ["Huzurnagar", "Kodad", "Suryapet", "Thungathurthi"],
  Vikarabad: ["Kodangal", "Pargi", "Tandur", "Vicarabad"],
  Wanaparthy: ["Wanaparthy"],
  Warangal: ["Narsampet", "Warangal East", "Waradhanapet"],
  "Yadadri Bhuvanagiri": ["Alair", "Bhongir"],
};

const PersonalDetails = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [gothram, setGothram] = useState("");
  const [caste, setCaste] = useState("");
  const [subCaste, setSubCaste] = useState("");
  const [casteType, setCasteType] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [constituency, setConstituency] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [nativePlace, setNativePalce] = useState("");
  const [residentialAddress, setResidentialAddress] = useState("")
  const [profession, setProfession] = useState("");
  const [professionCategory, setProfessionCategory] = useState("")
  const [officeAddress, setOfficeAddress] = useState("")
  const [ideaology, setIdeaology] = useState("");
  const [favouriteGod, setFavouriteGod] = useState("");
  const [regularlyVisitingTemple, setRegularlyVisitingTemple] = useState("");
  const [referee, setRefree] = useState("");


  const [error, setError] = useState("");
  const navigate = useNavigate();
  const onSubmitForm = async (event) => {
    event.preventDefault();
    if (name === "") {
      setError("Name is required");
    } else if (surname === "") {
      setError("Surname is required");
    } else if (gothram === "") {
      setError("Gothram is required");
    } else {
      const response = await fetch(`${express_url}/api/members/mydetails`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("jwtToken")}`,
        },
        body: JSON.stringify({ name, surname, gothram, caste,  subCaste, casteType, dob, gender, maritalStatus, phoneNumber }),
      });
      const data = await response.json();
      if (data.jwtToken) {
        Cookies.set("jwtToken", data.jwtToken);
        navigate("/");
      } else {
        setError(data);
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={onSubmitForm}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Your Suname"
                value={surname}
                onChange={(event) => setSurname(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Gothram</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Your Gothram"
                value={gothram}
                onChange={(event) => setGothram(event.target.value)}
              />
            </Form.Group>
            <Row>
              <Form.Group
                className="mb-3 col-6 col-md-6"
                controlId="exampleForm.ControlInput2"
                as={Col}
              >
                <Form.Label>Caste Category</Form.Label>

                <Form.Select
                  aria-label="Default select example"
                  value={caste}
                  onChange={(event) => setCaste(event.target.value)}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="OC">OC</option>
                  <option value="BC">BC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </Form.Select>
              </Form.Group>

              {caste in caste_category ? (
                <Form.Group
                  as={Col}
                  className="mb-3 col-6 col-md-6"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>Caste Sub Category</Form.Label>

                  <Form.Select
                    aria-label="Default select example"
                    value={subCaste}
                    onChange={(event) => setSubCaste(event.target.value)}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {caste_category[caste].map((caste) => (
                      <option value={caste}>{caste}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              ) : (
                ""
              )}
            </Row>
            {caste !== "OC" ? (
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Caste Category Type</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Category Type"
                  value={casteType}
                  onChange={(event) => setCasteType(event.target.value)}
                />
              </Form.Group>
            ) : (
              ""
            )}

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Your Category Type"
                value={dob}
                onChange={(event) => setDob(event.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3 col-6 col-md-6"
              controlId="exampleForm.ControlInput2"
            >
              <Form.Label>Gender</Form.Label>

              <Form.Check // prettier-ignore
                type="radio"
                id="default-radio-1"
                label="Male"
                value="Male"
                name="gender"
                onClick={(event) => setGender(event.target.value)}
              />
              <Form.Check // prettier-ignore
                type="radio"
                id="default-radio-2"
                label="Female"
                value="Female"
                name="gender"
                onClick={(event) => setGender(event.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3 col-6 col-md-6"
              controlId="exampleForm.ControlInput2"
            >
              <Form.Label>Marital Status</Form.Label>

              <Form.Check // prettier-ignore
                type="radio"
                id="default-radio-3"
                label="Single/Unmarried"
                value="Single/Unmarried"
                name="maritalStatus"
                onClick={(event) => setMaritalStatus(event.target.value)}
              />
              <Form.Check // prettier-ignore
                type="radio"
                id="default-radio-4"
                label="Married"
                value="Married"
                name="maritalStatus"
                onClick={(event) => setMaritalStatus(event.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3 col-6 col-md-6"
              controlId="exampleForm.ControlInput2"
            >
              <Form.Label>Blood Group</Form.Label>

              <Form.Select
                aria-label="Default select example"
                value={bloodGroup}
                onChange={(event) => setBloodGroup(event.target.value)}
              >
                <option value="" disabled>
                  Select{" "}
                </option>
                {blood_groups.map((group) => (
                  <option value={group}>{group}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Your Phone Number"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>WhatsApp Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Your WhatsApp Number"
                value={whatsappNumber}
                onChange={(event) => setWhatsappNumber(event.target.value)}
              />
            </Form.Group>

            <Row>
              <Form.Group
                className="mb-3 col-6 col-md-6"
                controlId="exampleForm.ControlInput2"
                as={Col}
              >
                <Form.Label>State</Form.Label>

                <Form.Select
                  aria-label="Default select example"
                  value={state}
                  onChange={(event) => setState(event.target.value)}
                >
                  <option value="" disabled>
                    Select{" "}
                  </option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Telangana">Telangana</option>
                </Form.Select>
              </Form.Group>

              <Form.Group
                className="mb-3 col-6 col-md-6"
                controlId="exampleForm.ControlInput2"
                as={Col}
              >
                <Form.Label>District</Form.Label>

                <Form.Select
                  aria-label="Default select example"
                  value={district}
                  onChange={(event) => setDistrict(event.target.value)}
                >
                  <option value="" disabled>
                    Select{" "}
                  </option>
                  {districts[state].map((district) => (
                    <option value={district}>{district}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>

            <Form.Group
              className="mb-3 col-6 col-md-6"
              controlId="exampleForm.ControlInput2"
              as={Col}
            >
              <Form.Label>Constituency</Form.Label>

              <Form.Select
                aria-label="Default select example"
                value={constituency}
                onChange={(event) => setConstituency(event.target.value)}
              >
                <option value="" disabled>
                  Select{" "}
                </option>
                {constituencies[district].map((constituency) => (
                  <option value={constituency}>{constituency}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Native Place</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Native Place"
                value={nativePlace}
                onChange={(event) => setNativePalce(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Residential Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                value={residentialAddress}
                onChange={(event) => setResidentialAddress(event.target.value)}
              />
            </Form.Group>          

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Business/Office Address              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                value={officeAddress}
                onChange={(event) => setOfficeAddress(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Favourite God
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Name"
                value={favouriteGod}
                onChange={(event) => setFavouriteGod(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Regularly Visiting Temple</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Temple Name"
                value={regularlyVisitingTemple}
                onChange={(event) => setRegularlyVisitingTemple(event.target.value)}
              />
            </Form.Group>

            <Card.Text>{error}</Card.Text>
            <Button variant="primary" onClick={onSubmitForm}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PersonalDetails;
