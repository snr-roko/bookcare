export type mobileMoneySelection = "mtn" | "telecel" | "airtelTigo" | null

export type mobileMoneyCardType = {
    mobileMoneySelection: mobileMoneySelection
    setMobileMoneySelection: React.Dispatch<React.SetStateAction<mobileMoneySelection>>
}