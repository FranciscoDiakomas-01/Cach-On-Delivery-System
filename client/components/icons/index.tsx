
type IconProps = {
  size?: number
  className?: string
}

export const HomeIcon = ({ size = 24, className }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3261_13847)">
        <path
          d="M22.28 6.90994L20.89 7.22994C19.9 7.45994 19.12 8.22994 18.89 9.22994L18.57 10.6199C18.54 10.7599 18.32 10.7599 18.29 10.6199L17.97 9.22994C17.74 8.23994 16.97 7.45994 15.97 7.22994L14.58 6.90994C14.44 6.87994 14.44 6.65994 14.58 6.62994L15.97 6.30994C16.96 6.07994 17.74 5.30994 17.97 4.30994L18.29 2.91994C18.32 2.77994 18.54 2.77994 18.57 2.91994L18.89 4.30994C19.12 5.29994 19.89 6.07994 20.89 6.30994L22.28 6.62994C22.42 6.65994 22.42 6.87994 22.28 6.90994Z"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M14.46 3.02005C13.02 1.90005 10.99 1.90005 9.55001 3.02005L3.55001 7.69005C2.58001 8.45005 2.01001 9.61005 2.01001 10.8501V18.0001C2.01001 20.2101 3.80001 22.0001 6.01001 22.0001H18.01C20.22 22.0001 22.01 20.2101 22.01 18.0001V10.8501"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path d="M12 15V18" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <defs>
        <clipPath id="clip0_3261_13847">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const MansIcon = ({ size = 24, className }: IconProps) => {
  return (<svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_3261_13781)">
      <path d="M7.41002 19.6101L6.42002 19.8401C5.71002 20.0001 5.16002 20.5601 4.99002 21.2701L4.76002 22.2601C4.74002 22.3601 4.58002 22.3601 4.56002 22.2601L4.33002 21.2701C4.17002 20.5601 3.61002 20.0101 2.90002 19.8401L1.91002 19.6101C1.81002 19.5901 1.81002 19.4301 1.91002 19.4101L2.90002 19.1801C3.61002 19.0201 4.16002 18.4601 4.33002 17.7501L4.56002 16.7601C4.58002 16.6601 4.74002 16.6601 4.76002 16.7601L4.99002 17.7501C5.15002 18.4601 5.71002 19.0101 6.42002 19.1801L7.41002 19.4101C7.51002 19.4301 7.51002 19.5901 7.41002 19.6101Z" strokeWidth="1.5" strokeMiterlimit="10" />
      <path d="M9.16 10.87C9.06 10.86 8.94 10.86 8.83 10.87C6.45 10.79 4.56 8.84 4.56 6.44C4.56 4.04 6.54 2 9 2C11.46 2 13.44 3.99 13.44 6.44C13.43 8.84 11.54 10.79 9.16 10.87Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.41 4C18.35 4 19.91 5.57 19.91 7.5C19.91 9.43 18.41 10.93 16.54 11C16.46 10.99 16.37 10.99 16.28 11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.00002 21.81C10.87 21.84 12.75 21.38 14.17 20.43C16.59 18.81 16.59 16.17 14.17 14.56C12.76 13.62 10.87 13.16 9.00002 13.19C8.00002 13.21 7.01002 13.36 6.10002 13.65C5.72002 13.77 5.36002 13.91 5.02002 14.08" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.34 20C19.06 19.85 19.74 19.56 20.3 19.13C21.86 17.96 21.86 16.03 20.3 14.86C19.75 14.44 19.08 14.16 18.37 14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_3261_13781">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>);
};

export const TagIcons = ({ size = 24, className }: IconProps) => {
  return (<svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_4418_169838)">
      <path d="M4.40476 15.5264L8.93476 20.0564C10.7948 21.9164 13.8148 21.9164 15.6848 20.0564L20.0748 15.6664C21.9348 13.8064 21.9348 10.7864 20.0748 8.91637L15.5348 4.39637C14.5848 3.44637 13.2748 2.93637 11.9348 3.00637L6.93476 3.24637C4.93476 3.33637 3.34476 4.92637 3.24476 6.91637L3.00476 11.9164C2.94476 13.2664 3.45476 14.5764 4.40476 15.5264Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.73474 12.2266C11.1155 12.2266 12.2347 11.1073 12.2347 9.72656C12.2347 8.34585 11.1155 7.22656 9.73474 7.22656C8.35403 7.22656 7.23474 8.34585 7.23474 9.72656C7.23474 11.1073 8.35403 12.2266 9.73474 12.2266Z" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13.2347 17.2266L17.2347 13.2266" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_4418_169838">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>);
};

export const ShopCartIcon = ({ size = 24, className }: IconProps) => {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_4418_9660)">
      <path d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 8H21" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_4418_9660">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>);
};