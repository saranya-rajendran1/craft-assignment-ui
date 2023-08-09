import { Box, Button, FormLabel, Grid, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FormInput, labelStyle } from "../Component/FormInput";
import { createProfile, getProfileDetail, updateProfile } from "../API/ProfileAPI";


export function ProfileDetail() { 
  const [data, setData] = useState<any>()
  const [details, setDetails] = useState<any>()
  const [profileId, setProfileId] = useState("")
  // const profileId = localStorage?.getItem('profileId')
  const [companyName, setCompanyName] = useState("");
  const [legalName, setLegalName] = useState("");
  const [businessAddress, setBusinessAddress] = useState({
    line1: "",
    line2: "",
    city:  "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [legalAddress, setLegalAddress] = useState({
    line1: "",
    line2:  "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [pan, setPan] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [saveClicked, setSaveClicked] = useState(false);

  console.log(profileId)

  useEffect(()=>{
    if(profileId){
     getProfileDetail(profileId)?.then((result:any) => setDetails(result))
    }
   },[profileId])

  useEffect(() => {
    setData(details?.data)
    setEmail(data?.email)
    setCompanyName(data?.companyName)
    setLegalName(data?.legalName)
    setBusinessAddress({
      line1: data?.companyAddress?.lineOne,
      line2:  data?.companyAddress?.lineTwo,
      city:  data?.companyAddress?.city,
      state:  data?.companyAddress?.state,
      postalCode:  data?.companyAddress?.zip,
      country:  data?.companyAddress?.country,
    })
    setLegalAddress({
      line1: data?.legalAddress?.lineOne,
      line2:  data?.legalAddress?.lineTwo,
      city:  data?.legalAddress?.city,
      state:  data?.legalAddress?.state,
      postalCode:  data?.legalAddress?.zip,
      country:  data?.legalAddress?.country,
    })
    setPan(data?.taxIdentifier)
    setWebsite(data?.website)

  },[details])

  const  clearValue = () => {
    setEmail("")
    setCompanyName("")
    setLegalName("")
    setBusinessAddress({
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  })
  setLegalAddress({
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  })
  setPan("")
  setWebsite("")

  }

  function CheckError() {
    const validToSubmit =
      companyName !== "" &&
      legalName !== "" &&
      pan !== "" &&
      website !== "" &&
      email !== "" &&
      businessAddress?.city !== "" &&
      businessAddress?.country !== "" &&
      businessAddress?.line1 !== "" &&
      businessAddress?.line2 !== "" &&
      businessAddress?.postalCode !== "" &&
      businessAddress?.state !== "" &&
      legalAddress?.city !== "" &&
      legalAddress?.country !== "" &&
      legalAddress?.line1 !== "" &&
      legalAddress?.line2 !== "" &&
      legalAddress?.postalCode !== "" &&
      legalAddress?.state !== "";
      return validToSubmit
  }

  function saveFunction() {
    setSaveClicked(true);
    const body = {
      userId: "f84ec623-276f-41d9-a5a4-0bbff042727d",
      companyName: companyName,
      legalName: legalName,
      companyAddress: {
        lineOne: businessAddress?.line1,
        lineTwo: businessAddress?.line2,
        city: businessAddress?.city,
        state: businessAddress?.state,
        zip: businessAddress?.postalCode,
        country: businessAddress?.country,
      },
      legalAddress: {
        lineOne: legalAddress?.line1,
        lineTwo: legalAddress?.line2,
        city: legalAddress?.city,
        state: legalAddress?.state,
        zip: legalAddress?.postalCode,
        country: legalAddress?.country,
      },
      taxIdentifier: pan,
      email: email,
      website: website,
      userProfileId: localStorage?.getItem('profileId')
    };
    const noError = CheckError();
    if (noError) {
      if(localStorage.getItem('profileId')){
        updateProfile(body)
        .then((result) => {
          localStorage?.setItem('profileId',result?.data?.userProfileId)
        })
        .catch((error) => console.log(error))
        .finally(() => setSaveClicked(false));
      } else {
        createProfile(body)
        .then((result) => {
          localStorage?.setItem('profileId',result?.data?.userProfileId)
          setProfileId(result?.data?.userProfileId)
        })
        .catch((error) => console.log(error))
        .finally(() => setSaveClicked(false));

      }
    
    }
  }

  return (
    <Box
      width={"900px"}
      height={"600px"}
      bgColor={"#fff"}
      paddingLeft={10}
      paddingRight={10}
      paddingTop={5}
      boxShadow={"0px 1px 6px #0000000F"}
    >
      <Heading
        color={"#F9A01B"}
        textDecorationColor={"#F9A01B"}
        as="u"
        textUnderlineOffset={12}
      >
        {"Profile"}
      </Heading>
      <Box height={"450px"} overflowY={"scroll"} paddingRight={10}>
        <Box marginY={35}>
          <FormInput
            label={"Company Name"}
            placeholder={"Enter Company Name"}
            value={companyName}
            isError={saveClicked && companyName === "" ? true : false}
            errorMessage={"Please enter company name"}
            onChange={(newValue:string) => {
              setCompanyName(newValue);
            }}
          />
        </Box>
        <Box marginY={10}>
          <FormInput
            label={"Legal Name"}
            placeholder={"Enter Legal Name"}
            value={legalName}
            isError={saveClicked && legalName === "" ? true : false}
            errorMessage={"Please enter legal name"}
            onChange={(newValue:string) => {
              setLegalName(newValue);
            }}
          />
        </Box>
        <Box marginY={10}>
          <FormLabel {...labelStyle}>{"Business Address"}</FormLabel>
          <Grid gap={6} gridTemplateColumns={"2fr 2fr"}>
            <FormInput
              placeholder={"Line 1"}
              value={businessAddress?.line1}
              isError={
                saveClicked && businessAddress?.line1 === "" ? true : false
              }
              errorMessage={"Please enter Line 1"}
              onChange={(newValue:string) => {
                setBusinessAddress({
                  ...businessAddress,
                  line1: newValue,
                });
              }}
            />
            <FormInput
              placeholder={"Line 2"}
              value={businessAddress?.line2}
              isError={
                saveClicked && businessAddress?.line2 === "" ? true : false
              }
              errorMessage={"Please enter Line 2"}
              onChange={(newValue:string) => {
                setBusinessAddress({
                  ...businessAddress,
                  line2: newValue,
                });
              }}
            />
            <FormInput
              placeholder={"City"}
              value={businessAddress?.city}
              isError={
                saveClicked && businessAddress?.city === "" ? true : false
              }
              errorMessage={"Please enter City"}
              onChange={(newValue:string) => {
                setBusinessAddress({
                  ...businessAddress,
                  city: newValue,
                });
              }}
            />
            <FormInput
              placeholder={"State"}
              value={businessAddress?.state}
              isError={
                saveClicked && businessAddress?.state === "" ? true : false
              }
              errorMessage={"Please enter State"}
              onChange={(newValue:string) => {
                setBusinessAddress({
                  ...businessAddress,
                  state: newValue,
                });
              }}
            />
            <FormInput
              placeholder={"Zip"}
              value={businessAddress?.postalCode}
              isError={
                saveClicked && businessAddress?.postalCode === "" ? true : false
              }
              errorMessage={"Please enter ZIP"}
              onChange={(newValue:string) => {
                setBusinessAddress({
                  ...businessAddress,
                  postalCode: newValue,
                });
              }}
            />
            <FormInput
              placeholder={"Country"}
              value={businessAddress?.country}
              isError={
                saveClicked && businessAddress?.country === "" ? true : false
              }
              errorMessage={"Please enter country"}
              onChange={(newValue:string) => {
                setBusinessAddress({
                  ...businessAddress,
                  country: newValue,
                });
              }}
            />
          </Grid>
        </Box>

        <Box marginY={10}>
          <FormLabel {...labelStyle}>{"Legal Address"}</FormLabel>
          <Grid gap={6} gridTemplateColumns={"2fr 2fr"}>
            <FormInput
              placeholder={"Line 1"}
              value={legalAddress?.line1}
              isError={saveClicked && legalAddress?.line1 === "" ? true : false}
              errorMessage={"Please enter Line 1"}
              onChange={(newValue:string) => {
                console.log("vlue", newValue);
                setLegalAddress({
                  ...legalAddress,
                  line1: newValue,
                });
              }}
            />
            <FormInput
              placeholder={"Line 2"}
              value={legalAddress?.line2}
              isError={saveClicked && legalAddress?.line2 === "" ? true : false}
              errorMessage={"Please enter Line 2"}
              onChange={(newValue:string) => {
                setLegalAddress({
                  ...legalAddress,
                  line2: newValue,
                });
              }}
            />
            <FormInput
              placeholder={"City"}
              value={legalAddress?.city}
              isError={saveClicked && legalAddress?.city === "" ? true : false}
              errorMessage={"Please enter City"}
              onChange={(newValue:string) => {
                setLegalAddress({
                  ...legalAddress,
                  city: newValue,
                });
              }}
            />
            <FormInput
              placeholder={"State"}
              value={legalAddress?.state}
              isError={saveClicked && legalAddress?.state === "" ? true : false}
              errorMessage={"Please enter State"}
              onChange={(newValue:string) => {
                setLegalAddress({
                  ...legalAddress,
                  state: newValue,
                });
              }}
            />
            <FormInput
              placeholder={"Zip"}
              value={legalAddress?.postalCode}
              isError={
                saveClicked && legalAddress?.postalCode === "" ? true : false
              }
              errorMessage={"Please enter ZIP"}
              onChange={(newValue:string) => {
                setLegalAddress({
                  ...legalAddress,
                  postalCode: newValue,
                });
              }}
            />
            <FormInput
              placeholder={"Country"}
              value={legalAddress?.country}
              isError={
                saveClicked && legalAddress?.country === "" ? true : false
              }
              errorMessage={"Please enter country"}
              onChange={(newValue:string) => {
                setLegalAddress({
                  ...legalAddress,
                  country: newValue,
                });
              }}
            />
          </Grid>
        </Box>

        <Box marginY={10}>
          <FormInput
            label={"PAN"}
            placeholder={"Enter PAN"}
            value={pan}
            isError={saveClicked && pan === "" ? true : false}
            errorMessage={"Please enter legal name"}
            onChange={(newValue:string) => {
              setPan(newValue);
            }}
          />
        </Box>

        <Box marginY={10}>
          <FormInput
            label={"Email"}
            placeholder={"Enter Email"}
            value={email}
            isError={saveClicked && email === "" ? true : false}
            errorMessage={"Please enter email"}
            onChange={(newValue:string) => {
              setEmail(newValue);
            }}
          />
        </Box>

        <Box marginY={10}>
          <FormInput
            label={"Website"}
            placeholder={"Enter Website"}
            value={website}
            isError={saveClicked && website === "" ? true : false}
            errorMessage={"Please enter website"}
            onChange={(newValue:string) => {
              setWebsite(newValue);
            }}
          />
        </Box>
      </Box>
      <Box
        my={5}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"flex-end"}
      >
        <Button mx={5}>{"Cancel"}</Button>
        <Button
          bgColor={"#0F968C"}
          color={"#fff"}
          onClick={() => saveFunction()}
        >
          {localStorage.getItem('profileId')? "Update" : "Save"}
        </Button>
      </Box>
    </Box>
  );
}
