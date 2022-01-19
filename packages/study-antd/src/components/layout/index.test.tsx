import renderer from 'react-test-renderer';
import Layout from './index';


test('layout with full elements', () => {
  const component = renderer.create((
    <Layout>
      <Layout.Sider>Sider</Layout.Sider>
      <Layout.Content>
        <Layout.Header>Header</Layout.Header>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout.Content>
    </Layout>
  ));
  expect(component.toJSON()).toMatchSnapshot();
});