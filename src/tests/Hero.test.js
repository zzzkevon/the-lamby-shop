// HeroSection.test.js
import { act} from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import HeroSection from '../components/HeroSection.jsx';
import CarouselContext from '../contexts/CarouselContext.jsx';
import CarouselContext1 from '../contexts/CarouselContext1.jsx';


// Mock data for contexts
const mockCarouselData = [
  { itemName: 
    "Strawberry Beanie", 
    signedUrl: "https://thelambyshop-images.s3.us-west-2.amazonaws.com/items/strawberry_beanie.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA6ODU4X5JSAU5EORO%2F20241107%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20241107T060754Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICWmQlzKcA6Ziq%2BfWDktyx%2BUa0Ebhic%2F8XZOGX2L2xt9AiBFZqhAECGY%2F8415xuzZJJ%2FMmARCecmvXDqw422TnTC4yqvAwg%2FEAAaDDk5MjM4MjU5ODk5NSIMSHlCww291QQjBtOtKowDThFgZOzBD6sJxxr9AviShQNjXDAKUYQtJ8U7o0qEs2OEeYBT%2BK7ddwy6DtYknsVVTOQqmDmEIyY%2BGQbb2xJ7b773zapDNMIvVR%2B2j7DrmtzTMFCIuvTrQEzse9z68oBJdH6yHF29qO8E22BHM29HAF4sUUwAZdJnAmwtiO2CmaHWPZJiXRUL9Uo9D5Z5%2FaIqS%2BHFLZSPPTYlS4MFdYlkerjcxqZ9RbDmZUgjfXsJvitEoiO5gmUuvs%2BmEkMgO0mBe2cRhTNKmAPJv4yxO5UTOs4yqeAXEvjsY3ONytbCIcjpaOXf5Mq%2B8XjiSNBJ91PArvVXWRK0WjYHXuUFnqi9Oo3%2BbSqrB5uKP1d8RwaTtB8ZPrfTTyDt6Jxr%2FW4RFY3WmJqoW%2B%2FdjatL6CCt483QpwjwWdEipqHEpDam47x%2FjO76zNmRUilYIz2DVWH%2Bp28oQn8S%2FSXB%2FQk1c9lEVvLjJY0pFMGTk%2FJLgQwaXqd0CPB0OoohMBaEpGE2jYmh04R%2B3zbV0Wu2qy9Z9LC%2FMJ%2BwsbkGOp4BJ3F5IlAP8uVZqUkDGnGCjByS8waeLyDwk5jNvupxDLJLk0X5M%2FMvExjsbqHVgPPqopwckQiXibv3OjYaIvwAWyVx7oq4e2GSehZjITPCq%2BO3oeupuCnX12PP7GB59BmKN4btB%2FJujViIejv2op90y5w3YBJdvPzkYGUcmTipD3kI2%2F%2FOXoV0mJXLL0NwXAnaL%2Bhu06rf82ny7pMSO1o%3D&X-Amz-Signature=9c071c5a821a9cbcda5c5245e06b71fb4bf97b893495a8608653085dda253a6a&X-Amz-SignedHeaders=host&x-id=GetObject", 
    type: 'popular' },
  { itemName: 
    "Apple Charm", 
    signedUrl: 
    "https://thelambyshop-images.s3.us-west-2.amazonaws.com/items/apple_charm.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA6ODU4X5JSAU5EORO%2F20241107%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20241107T060754Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICWmQlzKcA6Ziq%2BfWDktyx%2BUa0Ebhic%2F8XZOGX2L2xt9AiBFZqhAECGY%2F8415xuzZJJ%2FMmARCecmvXDqw422TnTC4yqvAwg%2FEAAaDDk5MjM4MjU5ODk5NSIMSHlCww291QQjBtOtKowDThFgZOzBD6sJxxr9AviShQNjXDAKUYQtJ8U7o0qEs2OEeYBT%2BK7ddwy6DtYknsVVTOQqmDmEIyY%2BGQbb2xJ7b773zapDNMIvVR%2B2j7DrmtzTMFCIuvTrQEzse9z68oBJdH6yHF29qO8E22BHM29HAF4sUUwAZdJnAmwtiO2CmaHWPZJiXRUL9Uo9D5Z5%2FaIqS%2BHFLZSPPTYlS4MFdYlkerjcxqZ9RbDmZUgjfXsJvitEoiO5gmUuvs%2BmEkMgO0mBe2cRhTNKmAPJv4yxO5UTOs4yqeAXEvjsY3ONytbCIcjpaOXf5Mq%2B8XjiSNBJ91PArvVXWRK0WjYHXuUFnqi9Oo3%2BbSqrB5uKP1d8RwaTtB8ZPrfTTyDt6Jxr%2FW4RFY3WmJqoW%2B%2FdjatL6CCt483QpwjwWdEipqHEpDam47x%2FjO76zNmRUilYIz2DVWH%2Bp28oQn8S%2FSXB%2FQk1c9lEVvLjJY0pFMGTk%2FJLgQwaXqd0CPB0OoohMBaEpGE2jYmh04R%2B3zbV0Wu2qy9Z9LC%2FMJ%2BwsbkGOp4BJ3F5IlAP8uVZqUkDGnGCjByS8waeLyDwk5jNvupxDLJLk0X5M%2FMvExjsbqHVgPPqopwckQiXibv3OjYaIvwAWyVx7oq4e2GSehZjITPCq%2BO3oeupuCnX12PP7GB59BmKN4btB%2FJujViIejv2op90y5w3YBJdvPzkYGUcmTipD3kI2%2F%2FOXoV0mJXLL0NwXAnaL%2Bhu06rf82ny7pMSO1o%3D&X-Amz-Signature=6c70ac656473ce7e19893c4bfa14f44c20fa3c9047b78901fd7b606a1fb88bc0&X-Amz-SignedHeaders=host&x-id=GetObject", 
    type: 'new' },
  { itemName: 
    "Chocolate Bunny", 
    signedUrl: 
    "https://thelambyshop-images.s3.us-west-2.amazonaws.com/items/chocolate_bunny.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA6ODU4X5JSAU5EORO%2F20241107%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20241107T060754Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICWmQlzKcA6Ziq%2BfWDktyx%2BUa0Ebhic%2F8XZOGX2L2xt9AiBFZqhAECGY%2F8415xuzZJJ%2FMmARCecmvXDqw422TnTC4yqvAwg%2FEAAaDDk5MjM4MjU5ODk5NSIMSHlCww291QQjBtOtKowDThFgZOzBD6sJxxr9AviShQNjXDAKUYQtJ8U7o0qEs2OEeYBT%2BK7ddwy6DtYknsVVTOQqmDmEIyY%2BGQbb2xJ7b773zapDNMIvVR%2B2j7DrmtzTMFCIuvTrQEzse9z68oBJdH6yHF29qO8E22BHM29HAF4sUUwAZdJnAmwtiO2CmaHWPZJiXRUL9Uo9D5Z5%2FaIqS%2BHFLZSPPTYlS4MFdYlkerjcxqZ9RbDmZUgjfXsJvitEoiO5gmUuvs%2BmEkMgO0mBe2cRhTNKmAPJv4yxO5UTOs4yqeAXEvjsY3ONytbCIcjpaOXf5Mq%2B8XjiSNBJ91PArvVXWRK0WjYHXuUFnqi9Oo3%2BbSqrB5uKP1d8RwaTtB8ZPrfTTyDt6Jxr%2FW4RFY3WmJqoW%2B%2FdjatL6CCt483QpwjwWdEipqHEpDam47x%2FjO76zNmRUilYIz2DVWH%2Bp28oQn8S%2FSXB%2FQk1c9lEVvLjJY0pFMGTk%2FJLgQwaXqd0CPB0OoohMBaEpGE2jYmh04R%2B3zbV0Wu2qy9Z9LC%2FMJ%2BwsbkGOp4BJ3F5IlAP8uVZqUkDGnGCjByS8waeLyDwk5jNvupxDLJLk0X5M%2FMvExjsbqHVgPPqopwckQiXibv3OjYaIvwAWyVx7oq4e2GSehZjITPCq%2BO3oeupuCnX12PP7GB59BmKN4btB%2FJujViIejv2op90y5w3YBJdvPzkYGUcmTipD3kI2%2F%2FOXoV0mJXLL0NwXAnaL%2Bhu06rf82ny7pMSO1o%3D&X-Amz-Signature=c510f8dad5b6972e485d50773cedefe7c54b798196e02893327167acc560695b&X-Amz-SignedHeaders=host&x-id=GetObject", 
    type: 'popular' },
];

const mockCarousel1Data = [
  { itemName: 
    "Strawberry Beanie", 
    signedUrl: "https://thelambyshop-images.s3.us-west-2.amazonaws.com/items/strawberry_beanie.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA6ODU4X5JSAU5EORO%2F20241107%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20241107T060754Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICWmQlzKcA6Ziq%2BfWDktyx%2BUa0Ebhic%2F8XZOGX2L2xt9AiBFZqhAECGY%2F8415xuzZJJ%2FMmARCecmvXDqw422TnTC4yqvAwg%2FEAAaDDk5MjM4MjU5ODk5NSIMSHlCww291QQjBtOtKowDThFgZOzBD6sJxxr9AviShQNjXDAKUYQtJ8U7o0qEs2OEeYBT%2BK7ddwy6DtYknsVVTOQqmDmEIyY%2BGQbb2xJ7b773zapDNMIvVR%2B2j7DrmtzTMFCIuvTrQEzse9z68oBJdH6yHF29qO8E22BHM29HAF4sUUwAZdJnAmwtiO2CmaHWPZJiXRUL9Uo9D5Z5%2FaIqS%2BHFLZSPPTYlS4MFdYlkerjcxqZ9RbDmZUgjfXsJvitEoiO5gmUuvs%2BmEkMgO0mBe2cRhTNKmAPJv4yxO5UTOs4yqeAXEvjsY3ONytbCIcjpaOXf5Mq%2B8XjiSNBJ91PArvVXWRK0WjYHXuUFnqi9Oo3%2BbSqrB5uKP1d8RwaTtB8ZPrfTTyDt6Jxr%2FW4RFY3WmJqoW%2B%2FdjatL6CCt483QpwjwWdEipqHEpDam47x%2FjO76zNmRUilYIz2DVWH%2Bp28oQn8S%2FSXB%2FQk1c9lEVvLjJY0pFMGTk%2FJLgQwaXqd0CPB0OoohMBaEpGE2jYmh04R%2B3zbV0Wu2qy9Z9LC%2FMJ%2BwsbkGOp4BJ3F5IlAP8uVZqUkDGnGCjByS8waeLyDwk5jNvupxDLJLk0X5M%2FMvExjsbqHVgPPqopwckQiXibv3OjYaIvwAWyVx7oq4e2GSehZjITPCq%2BO3oeupuCnX12PP7GB59BmKN4btB%2FJujViIejv2op90y5w3YBJdvPzkYGUcmTipD3kI2%2F%2FOXoV0mJXLL0NwXAnaL%2Bhu06rf82ny7pMSO1o%3D&X-Amz-Signature=9c071c5a821a9cbcda5c5245e06b71fb4bf97b893495a8608653085dda253a6a&X-Amz-SignedHeaders=host&x-id=GetObject", 
    type: 'popular' },
  { itemName: 
    "Apple Charm", 
    signedUrl: 
    "https://thelambyshop-images.s3.us-west-2.amazonaws.com/items/apple_charm.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA6ODU4X5JSAU5EORO%2F20241107%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20241107T060754Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICWmQlzKcA6Ziq%2BfWDktyx%2BUa0Ebhic%2F8XZOGX2L2xt9AiBFZqhAECGY%2F8415xuzZJJ%2FMmARCecmvXDqw422TnTC4yqvAwg%2FEAAaDDk5MjM4MjU5ODk5NSIMSHlCww291QQjBtOtKowDThFgZOzBD6sJxxr9AviShQNjXDAKUYQtJ8U7o0qEs2OEeYBT%2BK7ddwy6DtYknsVVTOQqmDmEIyY%2BGQbb2xJ7b773zapDNMIvVR%2B2j7DrmtzTMFCIuvTrQEzse9z68oBJdH6yHF29qO8E22BHM29HAF4sUUwAZdJnAmwtiO2CmaHWPZJiXRUL9Uo9D5Z5%2FaIqS%2BHFLZSPPTYlS4MFdYlkerjcxqZ9RbDmZUgjfXsJvitEoiO5gmUuvs%2BmEkMgO0mBe2cRhTNKmAPJv4yxO5UTOs4yqeAXEvjsY3ONytbCIcjpaOXf5Mq%2B8XjiSNBJ91PArvVXWRK0WjYHXuUFnqi9Oo3%2BbSqrB5uKP1d8RwaTtB8ZPrfTTyDt6Jxr%2FW4RFY3WmJqoW%2B%2FdjatL6CCt483QpwjwWdEipqHEpDam47x%2FjO76zNmRUilYIz2DVWH%2Bp28oQn8S%2FSXB%2FQk1c9lEVvLjJY0pFMGTk%2FJLgQwaXqd0CPB0OoohMBaEpGE2jYmh04R%2B3zbV0Wu2qy9Z9LC%2FMJ%2BwsbkGOp4BJ3F5IlAP8uVZqUkDGnGCjByS8waeLyDwk5jNvupxDLJLk0X5M%2FMvExjsbqHVgPPqopwckQiXibv3OjYaIvwAWyVx7oq4e2GSehZjITPCq%2BO3oeupuCnX12PP7GB59BmKN4btB%2FJujViIejv2op90y5w3YBJdvPzkYGUcmTipD3kI2%2F%2FOXoV0mJXLL0NwXAnaL%2Bhu06rf82ny7pMSO1o%3D&X-Amz-Signature=6c70ac656473ce7e19893c4bfa14f44c20fa3c9047b78901fd7b606a1fb88bc0&X-Amz-SignedHeaders=host&x-id=GetObject", 
    type: 'new' },
  { itemName: 
    "Chocolate Bunny", 
    signedUrl: 
    "https://thelambyshop-images.s3.us-west-2.amazonaws.com/items/chocolate_bunny.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA6ODU4X5JSAU5EORO%2F20241107%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20241107T060754Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICWmQlzKcA6Ziq%2BfWDktyx%2BUa0Ebhic%2F8XZOGX2L2xt9AiBFZqhAECGY%2F8415xuzZJJ%2FMmARCecmvXDqw422TnTC4yqvAwg%2FEAAaDDk5MjM4MjU5ODk5NSIMSHlCww291QQjBtOtKowDThFgZOzBD6sJxxr9AviShQNjXDAKUYQtJ8U7o0qEs2OEeYBT%2BK7ddwy6DtYknsVVTOQqmDmEIyY%2BGQbb2xJ7b773zapDNMIvVR%2B2j7DrmtzTMFCIuvTrQEzse9z68oBJdH6yHF29qO8E22BHM29HAF4sUUwAZdJnAmwtiO2CmaHWPZJiXRUL9Uo9D5Z5%2FaIqS%2BHFLZSPPTYlS4MFdYlkerjcxqZ9RbDmZUgjfXsJvitEoiO5gmUuvs%2BmEkMgO0mBe2cRhTNKmAPJv4yxO5UTOs4yqeAXEvjsY3ONytbCIcjpaOXf5Mq%2B8XjiSNBJ91PArvVXWRK0WjYHXuUFnqi9Oo3%2BbSqrB5uKP1d8RwaTtB8ZPrfTTyDt6Jxr%2FW4RFY3WmJqoW%2B%2FdjatL6CCt483QpwjwWdEipqHEpDam47x%2FjO76zNmRUilYIz2DVWH%2Bp28oQn8S%2FSXB%2FQk1c9lEVvLjJY0pFMGTk%2FJLgQwaXqd0CPB0OoohMBaEpGE2jYmh04R%2B3zbV0Wu2qy9Z9LC%2FMJ%2BwsbkGOp4BJ3F5IlAP8uVZqUkDGnGCjByS8waeLyDwk5jNvupxDLJLk0X5M%2FMvExjsbqHVgPPqopwckQiXibv3OjYaIvwAWyVx7oq4e2GSehZjITPCq%2BO3oeupuCnX12PP7GB59BmKN4btB%2FJujViIejv2op90y5w3YBJdvPzkYGUcmTipD3kI2%2F%2FOXoV0mJXLL0NwXAnaL%2Bhu06rf82ny7pMSO1o%3D&X-Amz-Signature=c510f8dad5b6972e485d50773cedefe7c54b798196e02893327167acc560695b&X-Amz-SignedHeaders=host&x-id=GetObject", 
    type: 'popular' },
];

describe('HeroSection', () => {
  it('renders Carousel1, ViewAllButton, Carousel2, and Subscribe components', () => {
    render(
      <CarouselContext.Provider value={{ carousel: mockCarouselData }}>
        <CarouselContext1.Provider value={{ carousel1: mockCarousel1Data }}>
          <Router>
            <HeroSection />
          </Router>
        </CarouselContext1.Provider>
      </CarouselContext.Provider>
    );

    // Assert that Carousel1 renders correctly
    mockCarousel1Data.forEach((item) => {
      expect(screen.getByAltText(item.itemName)).toBeInTheDocument();
    });

    // Assert that Carousel2 renders items from the context
    mockCarouselData.forEach((item) => {
      expect(screen.getByAltText(item.itemName)).toBeInTheDocument();
    });

    // Check for other components
    const links = screen.queryAllByText(/Shop Here!/i);
    expect(links.length).toBeGreaterThan(0); // Or another check as needed    expect(screen.getByText(/New Items!/i)).toBeInTheDocument();
    const viewAllButton = screen.getByRole('button', { name: /view all/i });
    expect(viewAllButton).toBeInTheDocument(); 
    
  });
});
