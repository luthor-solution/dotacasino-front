import { FiLogOut } from "react-icons/fi";

interface BalanceCardProps {
  amount: string;
  label: string;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ amount, label }) => (
  <div
    className="flex gap-x-[54px] p-[32px] border-2 border-[#FFC827] rounded-xl items-start"
    style={{
      boxShadow:
        "-3.828px -3.828px 6px 0px rgba(255, 200, 39, 0.4), 3px 5px 8px 0px rgba(255, 82, 1, 0.2)",
    }}
  >
    <div className="flex flex-col gap-y-[12px]">
      <div className="flex flex-col gap-y-[4px]">
        <span className="text-[40px] font-bold leading-[100%]">{amount}</span>
        <span className="text-[15px] leading-[100%]">{label}</span>
      </div>

      <span className="bg-[linear-gradient(0deg,_#ff9c19_40%,_#ffdd2d_110%)] px-[12px] py-[4px] rounded-[4px] w-fit text-black text-[12px] tracking-wide font-[500]">
        Ver Todo
      </span>
    </div>

    <div
      className={`rounded-full text-white w-fit text-center hover:shadow-[0_4px_24px_0_#ff9c19] transition-all duration-500 font-bold p-6 cursor-pointer bg-[linear-gradient(0deg,_#ff9c19_40%,_#ffdd2d_110%)] text-[30px]`}
    >
      <FiLogOut />
    </div>
  </div>
);

export default BalanceCard;
